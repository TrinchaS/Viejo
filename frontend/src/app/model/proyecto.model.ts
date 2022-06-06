export class proyecto{
    id?: number;
    nombre :String;
    url : String;
    descripcion :String;

    constructor(nombre :String, url :String, descripcion :String){
        this.nombre = nombre;
        this.url = url;
        this.descripcion = descripcion;
    }
}