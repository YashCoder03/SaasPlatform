import { Module } from '@nestjs/common';
import { TenantsService } from './tenant.service';
import { TenantsController } from './tenant.controller';

@Module({
  providers: [TenantsService],
  controllers: [TenantsController]
})
export class TenantsModule {}
