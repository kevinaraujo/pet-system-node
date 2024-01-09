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

    atualizarPet(
        id: number, 
        pet: PetEntity
    ): Promise<{ success: boolean, message?: string}> {
        throw new Error("Method not implemented.");
    }

    async deletarPet(id: number): Promise<{ success: boolean, message?: string}> {
        try {
            const petToRemove = await this.repository.findOne({
                where: { id }
            });
            
            if (!petToRemove) {
                return { success: false, message: "Pet not found." };
            }
            
            await this.repository.remove(petToRemove);
    
            return { success: true };
        
        } catch (err) {
            return {
                success: false,
                message: "Occurred an error when tried to delete the pet."
            }
        }
    }
    
}