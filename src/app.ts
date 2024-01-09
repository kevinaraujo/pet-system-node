import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { appDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());

router(app);

appDataSource.initialize().then(() => {
  console.log('Database connected');
})
.catch((err) => {
  console.log(err);
});

export default app;
