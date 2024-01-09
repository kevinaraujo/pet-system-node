import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    criarPet(pet: PetEntity): void {
        this.repository.save(pet);
    }

    async listarPet(): Promise<PetEntity[]> {
        return await this.repository.find();
    }

    atualizarPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }

    deletarPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }
    
}