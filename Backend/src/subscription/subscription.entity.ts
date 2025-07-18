import { BillingRepository } from "src/billing/billing.entity";
import { PlanRepository } from "src/plan/plan.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('subscription')
export class SubscriptionRepository{

    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    tenantId : string;
    
    @Column()
    planName : string;
    
    @Column()
    price : number;

    @Column()
    startDate : Date;

    @Column()
    endDate : Date;

    @Column()
    isActive : boolean;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

    @ManyToOne(() => PlanRepository, (plan) => plan.subscription)
    plan : PlanRepository;
    
    @OneToMany(() => BillingRepository, (billing) => billing.subscription)
    billings: BillingRepository[];
}