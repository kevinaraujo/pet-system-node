import express from "express"
import { appDataSource } from "../config/dataSource";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";

const router = express.Router();
const petRepository = new PetRepository(
    appDataSource.getRepository("PetEntity"),
    appDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

router.post('/', (req, res) => petController.criarPet(req, res));
router.get('/', (req, res) => petController.listarPets(req, res));
router.put('/:id', (req, res) => petController.atualizarPet(req, res));
router.delete('/:id', (req, res) => petController.deletarPet(req, res));
router.put('/:pet_id/:adotante_id', (req, res) => petController.adotarPet(req, res));
router.get('/filter-size', (req, res) => petController.buscarPet(req, res));

export default router;