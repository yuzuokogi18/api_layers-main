import { Request, Response } from 'express';
import { NoticiaService } from '../../noticia/services/noticiaService';

export class NoticiaController {
    constructor(private readonly noticiaService: NoticiaService) {}

    async getAll(req: Request, res: Response) {
        const noticias = await this.noticiaService.getAllNoticias();
        res.status(200).send({ status: true, data: noticias });
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const noticia = await this.noticiaService.getNoticiaById(id);
        res.status(200).send({ status: 'OK', data: noticia });
    }

    async create(req: Request, res: Response) {
        const data = req.body;
        const newNoticia = await this.noticiaService.createNoticia(data);
        res.status(200).send({ status: 'OK', data: newNoticia });
    }

    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updatedNoticia = await this.noticiaService.updateNoticia(id, data);
        res.status(200).send({ status: 'OK', data: updatedNoticia });
    }

    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const isDeleted = await this.noticiaService.deleteNoticia(id);
        res.status(200).send({ status: 'OK', data: isDeleted });
    }
}
