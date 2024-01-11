import { Request, Response } from "express";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    async criarAdotante(req: Request, res: Response) {
        try {
            const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

            const newAdotante = new AdotanteEntity(
                nome,
                senha,
                celular,
                foto,
                endereco,
            );

            await this.repository.criarAdotante(newAdotante);

            return res
                .status(201)
                .json(newAdotante);

        } catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({
                    error: 'Error on create Adopter'
                });
        }
    }

    async listarAdotante(req: Request, res: Response) {
        try {
            const list = await this.repository.listarAdotante();

            return res.json(list);

        } catch (err) {
            return res
                .status(500)
                .json({
                    error: 'Error when tried to list Adopters.'
                })
        }
    }

    async atualizarAdotante(req: Request, res: Response) {
        const { id } = req.params;
        
        const { success, message } = await this.repository.atualizarAdotante(
            Number(id),
            <AdotanteEntity>req.body
        );

        if (!success) {
            return res 
                .status(500)
                .json(message);
        }

        return res.json({
                success: true,
                message: `Adopter ${id} updated.`
            })
    }

    async deletarAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletarAdotante(Number(id));

        if (!success) { 
            return res
                .status(500)
                .json(message);
        }

        return res.json({
            success: true,
            message: `Adopter ${id} deleted.`
        });
    }
}