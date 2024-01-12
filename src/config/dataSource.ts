import { DataSource } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import PetEntity from "../entities/PetEntity";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    entities: [AdotanteEntity, PetEntity, EnderecoEntity],
    synchronize: true
});