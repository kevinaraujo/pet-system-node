import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfaceAdotanteRepository {
    criarAdotante(adotante: AdotanteEntity): void | Promise<void>;

    listarAdotante(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

    atualizarAdotante(
        id: number,
        adotante: AdotanteEntity
    ): Promise<{ success: boolean, message?: string }> | void;

    deletarAdotante(
        id: number
    ): Promise<{ success: boolean, message?: string }> | void;
}