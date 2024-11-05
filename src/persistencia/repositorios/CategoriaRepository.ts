import mysql from 'mysql2/promise';
import { Categoria } from '../models/Categoria';

export class CategoriaRepository {
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

    async getAllCategorias(): Promise<Categoria[]> {
        const [rows]: any = await this.connection.execute('SELECT * FROM categoria');
        return rows.map((row: any) => new Categoria(row.id, row.nombre));
    }

    async getCategoriaById(id: number): Promise<Categoria | null> {
        const [rows]: any = await this.connection.execute('SELECT * FROM categoria WHERE id = ?', [id]);
        if (rows.length > 0) {
            return new Categoria(rows[0].id, rows[0].nombre);
        }
        return null;
    }
}
