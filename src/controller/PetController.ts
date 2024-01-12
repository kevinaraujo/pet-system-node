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

    async criarPet(req: Request, res: Response) {
        const { nome, especie, adotado, dataNasc, porte } = <PetEntity>req.body;

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

        const newPet = new PetEntity(
            nome,
            especie,
            dataNasc,
            adotado,
            porte
        );

        await this.repository.criarPet(newPet);

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

    async adotarPet (req: Request, res: Response) {
        const { pet_id, adotante_id } = req.params;
        const { success, message } = await this.repository.adotarPet(
            Number(pet_id),
            Number(adotante_id),
        );

        if (!success) {
            return res
                .status(500)
                .json({ message });
        }

        return res.sendStatus(204);
    }
}