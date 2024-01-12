import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    criarAdotante(adotante: AdotanteEntity): void {
        this.repository.save(adotante);
    }

    async listarAdotante(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizarAdotante(id: number, newData: AdotanteEntity): Promise<{ success: boolean; message?: string }> {
        try {
            const adotante = await this.repository.findOne({ where: { id }});

            if (!adotante) {
                return {
                    success: false,
                    message: 'Adopter not found.'
                };
            }

            Object.assign(adotante, newData);

            await this.repository.save(adotante);

            return {
                success: true,
                message: `Adopter ${id} updated successfully.`
            };

        } catch (err) {
            return {
                success: false,
                message: 'Error on update Adopter.'
            };
        }
    }

    async deletarAdotante(id: number): Promise<{ success: boolean, message?: string }> {
        try {
            const adotante = await this.repository.findOne({ where: { id }});

            if (!adotante) {
                return {
                    success: false,
                    message: 'Adopter not found.'
                };
            }
            
            await this.repository.remove(adotante);

            return {
                success: true,
                message: 'Success on delete adopter.'
            }

        } catch (err) {
            return {
                success: false,
                message: 'Error when tried to delete Adopter.'
            };
        }
    }

    async atualizarEnderecoAdotante(
        adotante_id: number, 
        endereco: EnderecoEntity
    ): Promise<{ success: boolean; message?: string }> {

        const adotante = await this.repository.findOne({ 
            where: { 
                id: adotante_id 
            }
        });

        if (!adotante) {
            return {
                success: false,
                message: 'Adopter not found.'
            }
        }

        const newEndereco = new EnderecoEntity(
            endereco.cidade,
            endereco.estado
        );

        adotante.endereco = newEndereco;

        await this.repository.save(adotante);
        
        return {
            success: false,
            message: 'Success on update address.'
        }
    }
    
}