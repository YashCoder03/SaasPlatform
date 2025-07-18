import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService : UserService
    ){}

    @Post('/')
    async createUser(@Body() dto : CreateUserDTO){
        const {email,name,password} = dto;
        const isAvailable = this.userService.isEmailExist(email);
    }
}
