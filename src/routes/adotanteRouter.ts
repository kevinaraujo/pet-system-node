import express from "express";
import { appDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
    appDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criarAdotante(req, res));
router.get("/", (req, res) => adotanteController.listarAdotante(req, res));

export default router;