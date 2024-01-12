import PetEntity from "../../entities/PetEntity"

export default interface InterfacePetRepository {
    criarPet(pet: PetEntity): void;
    listarPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, newData: PetEntity): Promise<{ success: boolean, message?: string}> | void;
    deletarPet(id: number): Promise<{ success: boolean, message?: string}> | void;
    adotarPet(pet_id: number, adotante_id: number): Promise<{ success: boolean, message: string }>;
}