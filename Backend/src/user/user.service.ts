import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

    async emailExist(email : string) : Promise<boolean> {
        const user = await this.userRepository.findOne({where : {email}});
        if(user) return true;
        else return false;
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
}
