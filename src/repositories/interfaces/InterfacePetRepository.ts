import PetEntity from "../../entities/PetEntity"

export default interface InterfacePetRepository {
    criarPet(pet: PetEntity): void;
    listarPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, pet: PetEntity): Promise<{ success: boolean, message?: string}> | void;
    deletarPet(id: number): Promise<{ success: boolean, message?: string}> | void;
}