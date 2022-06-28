export class experiencia{
    idExp?: number;
    puestoExp: string;
    empresaExp: string;
    jornadaExp: string;
    fingresoExp: string;
    fegresoExp: string;
    ubicacionExp: string;
    paisExp: string;
    descripcionExp: string

    constructor(puesto: string, empresa: string, jornada: string, 
            fingreso: string, fegreso: string, ubicacion: string,
            pais: string, descripcion: string, id?: number){
        this.puestoExp = puesto;
        this.empresaExp = empresa;
        this.jornadaExp = jornada;
        this.fingresoExp = fingreso;
        this.fegresoExp = fegreso;
        this.ubicacionExp = ubicacion;
        this.paisExp = pais;
        this.descripcionExp = descripcion;
        this.idExp = id;
    }
}