import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";

export class CreateTenantDto{

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    domain : string;

    @IsOptional()
    @IsUrl()
    logoUrl?: string;
    
}