import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
    constructor(
        private readonly organizationRespository : Repository<OrganizationRepository>
    ){}

    async createOrganization(name : string) : Promise<OrganizationRepository>{
        const organization = this.organizationRespository.create({
            name
        });

        return await this.organizationRespository.save(organization);
    }

    async getAllOrganization() : Promise<OrganizationRepository[]>{
        return await this.organizationRespository.find();
    }

    async deleteOrganization(id : string) {
        await this.organizationRespository.delete(id);
    }
}
