import PetEntity from "../../entities/PetEntity"

export default interface InterfacePetRepository {
    criarPet(pet: PetEntity): void;
    listarPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, newData: PetEntity): Promise<{ success: boolean, message?: string}> | void;
    deletarPet(id: number): Promise<{ success: boolean, message?: string}> | void;
    adotarPet(petId: number, adotanteId: number): Promise<{ success: boolean, message: string }>;
}