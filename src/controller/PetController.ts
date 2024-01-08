import { Request, Response } from "express";
import SpecieEnum from "../enum/SpecieEnum";
import type petType from "../types/petType";

let petList: Array<petType> = [];
let id = 0;

function geraId() {
  id = id + 1;
  return id;
}
export default class PetController {
    criarPet(req: Request, res: Response) {
        const { nome, especie, adotado, dataNasc } = <petType>req.body;

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

        const newPet: petType = { id: geraId(), nome, especie, adotado, dataNasc };

        petList.push(newPet);

        return res
            .status(201)
            .json(newPet);
    }

    listarPets(req: Request, res: Response) {
        return res
            .status(200)
            .json(petList);
    }

    atualizarPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, adotado, dataNasc } = req.body as petType;

        const pet = petList.find(pet => pet.id === Number(id));

        if(!pet) {
            return res
                .status(404)
                .json({
                    error: "Pet not found"
                }); 
        }

        pet.nome = nome;
        pet.dataNasc = dataNasc;
        pet.especie = especie;
        pet.adotado = adotado;
        
        return res
            .status(200)
            .json(pet);
    }

    deletarPet(req: Request, res: Response) {
        const { id } = req.params;

        const pet = petList.find(pet => pet.id === Number(id));

        if (!pet) {
            return res
                .status(404)
                .json({
                    error: "Pet not found"
                });
        }

        const index = petList.indexOf(pet);
        petList.splice(index, 1);

         
        return res
            .status(200)
            .json({
                message: "Deletado com sucesso"
            });
    }
}