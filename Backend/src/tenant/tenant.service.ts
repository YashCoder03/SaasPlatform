import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantRepository } from './teanant.entity';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/user/user.entity';

@Injectable()
export class TenantsService {
    constructor(
            @InjectRepository(TenantRepository)
            private readonly tenantRepository : Repository<TenantRepository>
        ){}
    async isTenantNameExist(name : string) : Promise<boolean> {
        
        return await this.tenantRepository.exists({where : {name}});
    }

    async isTenantDomainExist(domain : string) : Promise<boolean> {

        return await this.tenantRepository.exists({where : {domain}});
    }

    async createTenant(name : string , domain : string , logoUrl : string = "") : Promise<TenantRepository>{
        const tenant = this.tenantRepository.create({
            name,
            domain,
            logoUrl
        });

        return await this.tenantRepository.save(tenant);
    }

    async getAllTenant(){
        return this.tenantRepository.find();
    }

    async getTenantById(id : string) : Promise<TenantRepository | null> {
        return this.tenantRepository.findOne({where : {id}});
        
    }

    async deleteTenantById(id : string) : Promise<boolean> {
        const deleteTenanat = await this.tenantRepository.delete(id);
        if(deleteTenanat) return true;
        else return false;
    }
}
