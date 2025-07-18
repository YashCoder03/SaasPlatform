import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository : Repository<UserRepository>
    ){}

    async getUserByEmail(email:string) : Promise<UserRepository | null>{
        const user = this.userRepository.findOne({where : {email}});
        return user;
    } 

    async isEmailExist(email : string) : Promise<boolean> {
        const user = await this.userRepository.findOne({where : {email}});
        // console.log(user);       
        if(!user) return false;
        else return true;
    }
    async saveUser(name :string, email:string, password : string) : Promise<UserRepository> {
        const user = this.userRepository.create({
            name,
            email,
            passwordHash : password
        });

        return await this.userRepository.save(user);
    }
    async getUserById(id : string) : Promise<UserRepository | null> {
        const user = await this.userRepository.findOneBy({id});
        return user;
    }

    async updateRefreshToken(id : string, refreshToken : string) : Promise<any> {
        const user = await this.getUserById(id);
        if(!user) return;
        user.hashedRefreshToken = refreshToken;
        await this.userRepository.save(user);
    }
    async hashPassword(password : string ) : Promise<string>{
        return await bcrypt.hash(password,10);
    }

    async getAllUsers() : Promise<UserRepository[]> {
        return  await this.userRepository.find();
    }

    async deleteUserById(id : string) {
        await this.userRepository.delete({id});
    }
}
