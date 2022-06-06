export class experiencia{
    id?: number;
    puesto: String;
    empresa: String;
    jornada: String;
    fingreso: String;
    fegreso: String;
    ubicacion: String;
    pais: String;

    constructor(puesto: String, empresa: String, jornada: String, 
            fingreso: String, fegreso: String, ubicacion: String, pais: String){
        this.puesto = puesto;
        this.empresa = empresa;
        this.jornada = jornada;
        this.fingreso = fingreso;
        this.fegreso = fegreso;
        this.ubicacion = ubicacion;
        this.pais = pais;
    }
}