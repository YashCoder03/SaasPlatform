import { Subscription } from "rxjs";
import { SubscriptionRepository } from "src/subscription/subscription.entity";
import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class PlanRepository {
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name : string;

    @Column()
    description : string;

    @Column()
    price : number;

    @Column()
    duration : string;

    @Column()
    features : string;

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(() => SubscriptionRepository, (subscription) => subscription.plan)
    subscription : SubscriptionRepository[];
}