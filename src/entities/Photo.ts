import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bike } from "./Bike";

@Entity({ name: "photos" })
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    filename: string;

    @ManyToOne(() => Bike, (bike) => bike.photos, {nullable:false})
    @JoinColumn({name:"idbike"})
    bike: Bike;
}