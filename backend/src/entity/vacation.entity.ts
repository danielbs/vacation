import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Followers } from "./followers.entity";

@Entity()
export class Vacation {
    @PrimaryGeneratedColumn()
    id: number | undefined; // Primary key generated automatically

    @Column({ type: 'varchar', length: 255 })
    destination: string | undefined; // Destination of the vacation

    @Column({ type: 'text' })
    description: string | undefined; // Description of the vacation

    @Column({ type: "decimal" })
    price: number | undefined; // Price of the vacation

    @Column({ type: 'text' })
    picture: string | undefined; // URL of the vacation picture

    @Column({ type: 'date' })
    start_date: Date | undefined; // Start date of the vacation

    @Column({ type: 'date' })
    end_date: Date | undefined; // End date of the vacation

    @OneToMany(() => Followers, followers => followers.vacation, {
        cascade: true, // Cascade operations to related entities
        onDelete: "CASCADE" // Automatically delete related entities on deletion
    })
    followers: Followers[]; // List of followers for this vacation
}
