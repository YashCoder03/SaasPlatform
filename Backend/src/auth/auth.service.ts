import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    async emailExist(email : string) : Promise<boolean> {
        return this.userService.emailExist(email);
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
