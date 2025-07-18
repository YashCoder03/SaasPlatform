import { OrganizationRepository } from "src/organization/organization.entity";
import { RoleRepository } from "src/role/role.entity";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"


export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest',
}

@Entity()
export class UserRepository {

    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    passwordHash : string;

    @Column({nullable : true})
    profilePic : string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    hashedRefreshToken: string;

    @ManyToOne(() => OrganizationRepository, (org) => org.user)
    organization: OrganizationRepository;

    @ManyToOne(() => RoleRepository, (role) => role.users)
    role: RoleRepository;
} 