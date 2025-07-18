import { SubscriptionRepository } from "src/subscription/subscription.entity";
import { TenantRepository } from "src/tenant/teanant.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BillingRepository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TenantRepository, tenant => tenant.billings)
  tenant: TenantRepository;

  @ManyToOne(() => SubscriptionRepository, subscription => subscription.billings)
  subscription: SubscriptionRepository;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: 'paid' | 'unpaid' | 'failed';

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;
}
