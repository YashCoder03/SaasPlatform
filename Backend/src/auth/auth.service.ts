import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>
    ){}

    async register(dto : RegisterDto)
    {
        const existing = await this.userRepository.findOne({ where: { email: dto.email } });
        if(existing){
            throw new BadRequestException("Email Already Exisit");
        }

        const passwordHash = await bcrypt.hash(dto.password,10);

        const user = this.userRepository.create({
            name : dto.email,
            email : dto.email,
            passwordHash : passwordHash,
        });

        await this.userRepository.save(user);
        return {messaege : "User Register Successfully"};
    }
    async login(dto : LoginDto){
        const user = await this.userRepository.findOne({where : {email : dto.email}});

        if(!user){ 
            throw new UnauthorizedException("User Not Found");
        }

        const isPasswordValid = await bcrypt.compare(dto.password,user.passwordHash);
        if(!isPasswordValid){
            throw new UnauthorizedException("Creadential Not Correct");
        }

        return {message : "User Successfully Logined" , user : user.id };
    }
}
