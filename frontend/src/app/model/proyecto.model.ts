export class proyecto{
    id?: number;
    nombre :string;
    url : string;
    descripcion :string;

    constructor(nombre :string, url :string, descripcion :string, id? :number){
        this.nombre = nombre;
        this.url = url;
        this.descripcion = descripcion;
        this.id = id;
    }
}