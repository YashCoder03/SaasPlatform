import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
        const isAvailable = await this.userService.isEmailExist(email);
        if(isAvailable){
            throw new BadRequestException("Email Already Exist");
        }

        const hashPassword = await this.userService.hashPassword(password);

        const user = await this.userService.saveUser(name,email,hashPassword);
        
        return {"message" : "User is Created" , "userId" : user.id};
    }
    
    @Get('')
    async getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id : string) {
        return this.userService.getUserById(id);
    }

    @Delete('id')
    async deleteUserById(@Param('id') id : string) {
        await this.userService.deleteUserById(id);
        return {message : "User Deleted Successfully"};
    }
}
