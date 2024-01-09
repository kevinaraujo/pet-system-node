import { Request, Response } from "express";
import PetEntity from "../entities/PetEntity";
import SpecieEnum from "../enum/SpecieEnum";
import PetRepository from "../repositories/PetRepository";
import type petType from "../types/petType";

let petList: Array<petType> = [];
let id = 0;

function geraId() {
  id = id + 1;
  return id;
}
export default class PetController {
    constructor(private repository: PetRepository) {}

    criarPet(req: Request, res: Response) {
        const { nome, especie, adotado, dataNasc } = <PetEntity>req.body;

        if (!especie || !nome || !dataNasc) {
            return res
              .status(400)
              .json({ erro: "All fields required." });
        }
        
        if (!Object.values(SpecieEnum).includes(especie)) {
            return res
                .status(400)
                .json({ 
                    error: "Invalid Specie"
                })
        }

        const newPet = new PetEntity();
        newPet.id = geraId();
        newPet.nome = nome;
        newPet.especie = especie;
        newPet.adotado = adotado;
        newPet.dataNasc = dataNasc;

       this.repository.criarPet(newPet);

        return res
            .status(201)
            .json(newPet);
    }

    async listarPets(req: Request, res: Response) {
        const petList = await this.repository.listarPet();

        return res
            .status(200)
            .json(petList);
    }

    async atualizarPet(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizarPet(
            Number(id),
            req.body as PetEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async deletarPet(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletarPet(Number(id));

        if (!success) {
            return res
                .status(404)
                .json({ message });
        }

        return res.sendStatus(204);
    }
}