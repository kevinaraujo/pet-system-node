import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import SpecieEnum from "../enum/SpecieEnum";

@Entity()
export default class PetEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    especie: SpecieEnum;

    @Column()
    dataNasc: Date;
    
    @Column()
    adotado: boolean;

    constructor(
        nome: string,
        especie: SpecieEnum, 
        dataNasc: Date, 
        adotado: boolean
    ) {
        this.nome = nome;
        this.especie = especie;
        this.dataNasc = dataNasc;
        this.adotado = adotado;
    }
}