import { TenantRepository } from "src/tenant/teanant.entity";
import { UserRepository } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrganizationRepository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => TenantRepository, (tenant) => tenant.organization)
  tenant: TenantRepository;

  @OneToMany(() => UserRepository, (user) => user.organization)
  user: UserRepository[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
