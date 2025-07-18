import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async isEmailExist(email : string) : Promise<boolean> {
        return await this.userService.isEmailExist(email);
    }
    
    async validateUser(email : string, password : string) : Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if(user && await bcrypt.compare(password,user.passwordHash)){
            return user;
        } 
        return false;
    }
    async login(user : UserRepository){
        const payload = {email : user.email, sub : user.id, role : user.role};

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRY'),
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRY'),
        });

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return {
        accessToken,
        refreshToken,
        };
    }
    async hashPassword(password : string ) : Promise<string>{
        return await bcrypt.hash(password,10);
    } 
}
