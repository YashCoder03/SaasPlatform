import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService : OrganizationService,
    ){}

    @Post()
    async createOrganization(@Body() dto : CreateOrganizationDto){

        const {name} = dto;
        await this.organizationService.createOrganization(name);

        return {"message" : "Organization is created"};
    }

    @Get('')
    async getAllOrganization(){
        return this.organizationService.getAllOrganization();
    }

    @Delete(':id')
    async deleteOrganization(@Param('id') id : string) {
        await this.organizationService.deleteOrganization(id);
    }
}
