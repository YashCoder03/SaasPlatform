import { BillingRepository } from "src/billing/billing.entity";
import { OrganizationRepository } from "src/organization/organization.entity";
import { SubscriptionRepository } from "src/subscription/subscription.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TenantRepository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  domain: string;

  @Column() // removed unique
  logoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SubscriptionRepository, (subscription) => subscription.tenantId)
  subscriptions: SubscriptionRepository[];

  @OneToMany(() => OrganizationRepository, (organization) => organization.tenant)
  organization : OrganizationRepository;

  @OneToMany(() => BillingRepository, billing => billing.tenant)
  billings: BillingRepository[];
}
