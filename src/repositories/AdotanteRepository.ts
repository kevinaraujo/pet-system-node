import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    async listarAdotante(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    atualizarAdotante(id: number, adotante: AdotanteEntity): void | Promise<{ success: boolean; message?: string | undefined; }> {
        throw new Error("Method not implemented.");
    }

    deletarAdotante(id: number): void | Promise<{ success: boolean; message?: string | undefined; }> {
        throw new Error("Method not implemented.");
    }

    criarAdotante(adotante: AdotanteEntity): void {
        this.repository.save(adotante);
    }
    
}