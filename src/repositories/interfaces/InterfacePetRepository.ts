import PetEntity from "../../entities/PetEntity"
import SizeEnum from "../../enum/SizeEnum";

export default interface InterfacePetRepository {
    criarPet(pet: PetEntity): void;
    listarPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, newData: PetEntity): Promise<{ success: boolean, message?: string}> | void;
    deletarPet(id: number): Promise<{ success: boolean, message?: string}> | void;
    adotarPet(petId: number, adotanteId: number): Promise<{ success: boolean, message: string }>;
    buscarPet(porte: SizeEnum): Promise<PetEntity[]> | PetEntity[];
}