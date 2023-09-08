import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bike } from "./Bike";
import { User } from "./User";

export type Valuation = 1 | 2 | 3 | 4 | 5;

@Entity({ name: "rents" })
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: "date" })
    date: Date;

    @Column({
        nullable: false,
        type: "enum",
        enum: [1,2,3,4,5],
    })
    ownervaluation: Valuation;

    @Column({
        nullable: true,
        type: "enum",
        enum: [1,2,3,4,5],
    })
    clientvaluation: Valuation;

    @ManyToOne(() => Bike, (bike) => bike.rents, {nullable:false})
    @JoinColumn({ name: "idbike" })
    bike: Bike;

    @ManyToOne(() => User, (user) => user.rents, {nullable:false})
    @JoinColumn({ name: "idowner" })
    owner: User;

    @ManyToOne(() => User, (user) => user.rents, {nullable:false})
    @JoinColumn({ name: "idclient" })
    client: User;
}