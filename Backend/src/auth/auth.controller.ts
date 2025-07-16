import { BadRequestException, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService : AuthService,
        private readonly userService : UserService
    ){}

    @Post("/register")
    async register(dto : RegisterDto){
        if(!await this.authService.emailExist(dto.email)){
            throw new BadRequestException("Email Already Exisit");
        }
        const passwordHash = await this.authService.hashPassword(dto.password);
        const user = await this.userService.saveUser(dto.name,dto.email,passwordHash);

        return {message : "Register Successfully" , userId : user.id};

    }

    async login(dto : LoginDto) {
        const user = await this.authService.validateUser(dto.email,dto.password);
        if(!user){
            throw new UnauthorizedException("Creadential Not Correct");
        }
         
        return this.authService.login(user);
    }
    
}
