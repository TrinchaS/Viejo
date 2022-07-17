export class experiencia{
    id?: number;
    puesto: string;
    empresa: string;
    jornada: string;
    fingreso: string;
    fegreso: string;
    ubicacion: string;
    pais: string;
    descripcion: string

    constructor(puesto: string, empresa: string, jornada: string, 
            fingreso: string, fegreso: string, ubicacion: string,
            pais: string, descripcion: string, id?: number){
        this.puesto = puesto;
        this.empresa = empresa;
        this.jornada = jornada;
        this.fingreso = fingreso;
        this.fegreso = fegreso;
        this.ubicacion = ubicacion;
        this.pais = pais;
        this.descripcion = descripcion;
        this.id = id;
    }
}