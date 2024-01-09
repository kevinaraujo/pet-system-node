import PetEntity from "../../entities/PetEntity"

export default interface InterfacePetRepository {
    criarPet(pet: PetEntity): void;
    listarPet(): Array<PetEntity>;
    atualizarPet(id: number, pet: PetEntity): void;
    deletarPet(id: number, pet: PetEntity): void
}