import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 20, unique:true })
    name: string
}