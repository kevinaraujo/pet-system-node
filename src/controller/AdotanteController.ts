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
                celular,
                endereco,
                foto,
                senha
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
}