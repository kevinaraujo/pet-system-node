import { Request, Response } from "express";

let petList = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const newPet = req.body

        petList.push(newPet)

        return res
            .status(201)
            .json(newPet)
    }
}