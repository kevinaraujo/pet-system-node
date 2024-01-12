import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

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
    
    atualizarEnderecoAdotante(
        adotante_id: Number,
        endereco: EnderecoEntity
    ): Promise<{ success: boolean, message?: string}> | void;
}