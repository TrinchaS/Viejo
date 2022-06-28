export class habilidad{
    idHab?: number;
    nombreHab: String;
    porcentajeHab: String;

    constructor(nombre: String, porcentaje :String, id?: number){
        this.nombreHab = nombre;
        this.porcentajeHab = porcentaje;
        this.idHab = id;
    }
}