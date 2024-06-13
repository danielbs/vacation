import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vacation } from "./vacation.entity";
import { User } from "./user.entity";

@Entity()
export class Followers {
    @PrimaryGeneratedColumn()
    id: number | undefined; // Primary key generated automatically

    @ManyToOne(() => User) // Many Followers belong to one User
    @JoinColumn({ name: "userId" }) // Define the column name for the foreign key
    user: User | undefined; // The user who is following the vacation

    @ManyToOne(() => Vacation) // Many Followers belong to one Vacation
    @JoinColumn({ name: "vacationId" }) // Define the column name for the foreign key
    vacation: Vacation | undefined; // The vacation being followed
}
