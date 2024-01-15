import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import PetEntity from "../entities/PetEntity";
import SizeEnum from "../enum/SizeEnum";
import AdotanteRepository from "./AdotanteRepository";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>

    constructor(
        repository: Repository<PetEntity>,
        adotanteRepository: Repository<AdotanteEntity>
    ) {
        this.repository = repository;
        this.adotanteRepository = adotanteRepository;
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

    async adotarPet(
        petId: number, 
        adotanteId: number
    ): Promise<{ success: boolean, message: string }> {
        const pet = await this.repository.findOne({
            where: { id: petId }
        });

        if (!pet) {
            return {
                success: false,
                message: 'Pet not found.'
            };
        }

        const adotante = await this.adotanteRepository.findOne({
            where: { id: adotanteId }
        });

        if (!adotante) {
            return {
                success: false,
                message: 'Adopter not found.'
            };
        }

        pet.adotante = adotante;
        pet.adotado = true;

        await this.repository.save(pet);

        return {
            success: true,
            message: 'Adoption done.'
        }
    }
    
    async buscarPet(porte: SizeEnum): Promise<PetEntity[]> {
        return await this.repository.find({
            where: {
                porte
            }
        });
    }

    async buscarPetByField<Type extends keyof PetEntity>(
        field: Type, 
        value: PetEntity[Type]
    ): Promise<PetEntity[]> {
        
        const pets = await this.repository.find({
            where: {
                [field]: value
            }
        });

        return pets;
    }
}