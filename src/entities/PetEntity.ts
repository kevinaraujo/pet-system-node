import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SizeEnum from "../enum/SizeEnum";
import SpecieEnum from "../enum/SpecieEnum";
import AdotanteEntity from "./AdotanteEntity";

@Entity()
export default class PetEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    especie: SpecieEnum;

    @Column({ nullable: true })
    porte?: SizeEnum;

    @Column()
    dataNasc: Date;
    
    @Column()
    adotado: boolean;

    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!:AdotanteEntity;
    
    constructor(
        nome: string,
        especie: SpecieEnum, 
        dataNasc: Date, 
        adotado: boolean,
        porte?: SizeEnum,
    ) {
        this.nome = nome;
        this.especie = especie;
        this.dataNasc = dataNasc;
        this.adotado = adotado;
        this.porte = porte;
    }
}