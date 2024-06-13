import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Followers } from "./followers.entity";

// Enum defining user roles
export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined; // Primary key generated automatically

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string | undefined; // Email of the user

    @Column({ type: 'varchar', length: 255 })
    firstName: string | undefined; // First name of the user

    @Column({ type: 'varchar', length: 255 })
    lastName: string | undefined; // Last name of the user

    @Column({ type: 'varchar', length: 255 })
    password: string | undefined; // Password of the user

    @Column({
        type: 'enum',
        enum: UserRole, // Define the role enum
        default: UserRole.USER, // Default role is USER
    })
    role: UserRole | undefined; // Role of the user, default is USER

    @OneToMany(() => Followers, followers => followers.user)
    following: Followers[]; // List of followers for this user
}
