import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"


export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest',
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    passwordHash : string;

    @Column({nullable : true})
    profilePic : string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role : UserRole;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 