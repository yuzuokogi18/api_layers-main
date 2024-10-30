export class Noticia {
    private id: number;
    private titulo: string;
    private descripcion_breve: string;
    private contenido: string;
    private categoria: string;
    private fecha_publicacion: Date;
    private origen: string;
    private autor: string;
    private fuente_publicacion: string;

    constructor(id: number, titulo: string, descripcion_breve: string, contenido: string, categoria: string, fecha_publicacion: Date, origen: string, autor: string, fuente_publicacion: string) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion_breve = descripcion_breve;
        this.contenido = contenido;
        this.categoria = categoria;
        this.fecha_publicacion = fecha_publicacion;
        this.origen = origen;
        this.autor = autor;
        this.fuente_publicacion = fuente_publicacion;
    }
}
