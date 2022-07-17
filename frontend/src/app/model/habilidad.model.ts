export class habilidad{
    id?: number;
    nombre: string;
    porcentaje: string;

    constructor(nombre: string, porcentaje :string, id?: number){
        this.nombre = nombre;
        this.porcentaje = porcentaje;
        this.id = id;
    }
}