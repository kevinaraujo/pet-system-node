import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import SpecieEnum from "../enum/SpecieEnum";

@Entity()
export default class PetEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    especie: SpecieEnum;

    @Column()
    dataNasc: Date;
    
    @Column()
    adotado: boolean;
}