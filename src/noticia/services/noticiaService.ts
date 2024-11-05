import { NoticiaRepository } from '../../persistencia/repositorios/NoticiaRepository';
import { Noticia } from '../../persistencia/models/Noticia';

export class NoticiaService {
    constructor(private readonly noticiaRepositorio: NoticiaRepository) {}

    async getAllNoticias(): Promise<Noticia[] | null> {
        return this.noticiaRepositorio.getAllNoticias();
    }

    async getNoticiaById(id: number): Promise<Noticia | null> {
        return this.noticiaRepositorio.getNoticiaById(id);
    }

    async createNoticia(data: any): Promise<Noticia | null> {
        return this.noticiaRepositorio.createNoticia(data);
    }

    async updateNoticia(id: number, data: any): Promise<Noticia | null> {
        return this.noticiaRepositorio.updateNoticia(id, data);
    }

    async deleteNoticia(id: number): Promise<boolean> {
        return this.noticiaRepositorio.deleteNoticia(id);
    }

    // Nuevo método para buscar noticias
    async searchNoticias(titulo: string): Promise<Noticia[] | null> {
        return this.noticiaRepositorio.searchNoticiasByTitle(titulo);
    }
}
