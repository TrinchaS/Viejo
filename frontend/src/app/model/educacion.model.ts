export class educacion{
    id?: number;
    instituto: String;
    titulo: String;
    fingreso: String;
    fegreso: String;

    constructor(instituto: String, titulo: String, fIngreso: String, fEgreso: String){
        this.instituto = instituto;
        this.titulo = titulo;
        this.fingreso = fIngreso;
        this.fegreso = fEgreso;
    }
}