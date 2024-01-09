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

    async atualizarPet(
        id: number, 
        newData: PetEntity
    ): Promise<{ success: boolean, message?: string}> {
        try {
            const pet = await this.repository.findOne({ where: { id }});

            if(!pet) {
                return {
                    success: false,
                    message: "Pet not found."
                };
            }
            console.log('pet => ', pet)
            console.log('newData => ', newData)

            Object.assign(pet, newData);

            await this.repository.save(pet);

            return { success: true };

        } catch (err) {
            console.log(err);

            return {
                success: false,
                message: "Occurred an error when tried to update the pet."
            }
        }
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
            console.log(err);
            
            return {
                success: false,
                message: "Occurred an error when tried to delete the pet."
            }
        }
    }
    
}