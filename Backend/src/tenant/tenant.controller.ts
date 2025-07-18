import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TenantRepository } from './teanant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantsService } from './tenant.service';
import { NotFoundError } from 'rxjs';

@Controller('tenants')
export class TenantsController {
    constructor(
        private readonly tenantService : TenantsService
    ){}

    @Post('/create')
    async createTenant(@Body() dto : CreateTenantDto){
        const {name , domain, logoUrl } = dto;
        if(await this.tenantService.isTenantNameExist(name)){
            throw new BadRequestException("Name Already Exist");
        } 

        if(await this.tenantService.isTenantDomainExist(domain)){
            throw new BadRequestException("Domain Already Exist");
        }

        const tenant = await this.tenantService.createTenant(name,domain,logoUrl);
        return {message : "Tenant is Created" , tenantId : tenant.id};
    }

    @Get('')
    async getAllTenant(){
        return this.tenantService.getAllTenant();
    }

    @Get(':id')
    async getTenantById(@Param('id') id:string){
        const tenant =  this.tenantService.getTenantById(id);
        if(!tenant) {
            throw new NotFoundException("Tenant is not found");
        }
        return tenant;
    }

    @Delete(':id')
    async deleteTenantById(@Param('id') id:string){
        const isDeleted = this.tenantService.deleteTenantById(id);
        if(!isDeleted){
            throw new NotFoundException("Tenant is not found")
        }
        else true;
    }
}
