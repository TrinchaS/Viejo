export class educacion{
    id?: number;
    instituto: string;
    titulo: string;
    fingreso: string;
    fegreso: string;

    constructor (instituto: string, titulo: string, fingreso: string, fegreso: string, id?: number) {
        this.instituto = instituto;
        this.titulo = titulo;
        this.fingreso = fingreso;
        this.fegreso = fegreso;
        this.id = id;
    }
}