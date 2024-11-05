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

    // Nuevo método para buscar noticias por título
    async search(req: Request, res: Response) {
        const titulo = req.query.titulo as string; // Obtiene el título de la consulta
        try {
            if (!titulo) {
                return res.status(400).send({ status: false, message: 'Se requiere un título para la búsqueda.' });
            }
            const noticias = await this.noticiaService.searchNoticias(titulo);
            return res.status(200).send({ status: true, data: noticias });
        } catch (error: any) { // Especificar el tipo como 'any'
            return res.status(500).send({ status: false, message: error.message });
        }
    }
    
}
