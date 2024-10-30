import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Noticia } from '../models/Noticia';

dotenv.config();

export class NoticiaRepository {
    private connection: mysql.Pool;

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
        });
    }

    async getAllNoticias(): Promise<Noticia[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM noticia');
        return rows as Noticia[];
    }

    async getNoticiaById(id: number): Promise<Noticia | null> {
        const [rows]: any = await this.connection.execute('SELECT * FROM noticia WHERE id = ?', [id]);
        if (rows.length > 0) {
            return new Noticia(
                rows[0].id,
                rows[0].titulo,
                rows[0].descripcion_breve,
                rows[0].contenido,
                rows[0].categoria,
                rows[0].fecha_publicacion,
                rows[0].origen,
                rows[0].autor,
                rows[0].fuente_publicacion,
            );
        }
        return null;
    }

    async createNoticia(data: any): Promise<Noticia | null> {
        const [result]: any = await this.connection.execute('INSERT INTO noticia (titulo, descripcion_breve, contenido, categoria, fecha_publicacion, origen, autor, fuente_publicacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.titulo, data.descripcion_breve, data.contenido, data.categoria, data.fecha_publicacion, data.origen, data.autor, data.fuente_publicacion]);
        return new Noticia(result.insertId, data.titulo, data.descripcion_breve, data.contenido, data.categoria, data.fecha_publicacion, data.origen, data.autor, data.fuente_publicacion);
    }

    async updateNoticia(id: number, data: any): Promise<Noticia | null> {
        await this.connection.execute('UPDATE noticia SET titulo=?, descripcion_breve=?, contenido=?, categoria=?, fecha_publicacion=?, origen=?, autor=?, fuente_publicacion=? WHERE id=?', [data.titulo, data.descripcion_breve, data.contenido, data.categoria, data.fecha_publicacion, data.origen, data.autor, data.fuente_publicacion, id]);
        return new Noticia(id, data.titulo, data.descripcion_breve, data.contenido, data.categoria, data.fecha_publicacion, data.origen, data.autor, data.fuente_publicacion);
    }

    async deleteNoticia(id: number): Promise<boolean> {
        const [result]: any = await this.connection.execute('DELETE FROM noticia WHERE id=?', [id]);
        return result.affectedRows > 0;
    }
}
