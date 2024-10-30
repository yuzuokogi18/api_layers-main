import express, { Router } from 'express';
import { NoticiaController } from '../controllers/noticiaController';
import { NoticiaService } from '../../noticia/services/noticiaService';
import { NoticiaRepository } from '../../persistencia/repositorios/NoticiaRepository';

export const noticiaRoutes: Router = express.Router();
const noticiaRepository = new NoticiaRepository();
const noticiaService = new NoticiaService(noticiaRepository);
const noticiaController = new NoticiaController(noticiaService);

noticiaRoutes.get("/", noticiaController.getAll.bind(noticiaController));
noticiaRoutes.get("/:id", noticiaController.getById.bind(noticiaController));
noticiaRoutes.post("/", noticiaController.create.bind(noticiaController));
noticiaRoutes.put("/:id", noticiaController.update.bind(noticiaController));
noticiaRoutes.delete("/:id", noticiaController.delete.bind(noticiaController));
