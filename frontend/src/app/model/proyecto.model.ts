export class proyecto{
    idPro?: number;
    nombrePro :String;
    urlPro : String;
    descripcionPro :String;

    constructor(nombre :String, url :String, descripcion :String, id? :number){
        this.nombrePro = nombre;
        this.urlPro = url;
        this.descripcionPro = descripcion;
        this.idPro = id;
    }
}