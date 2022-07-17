export class persona{
    id?: number;
    nombre: String;
    apellido: String;
    tituloNivel :String;
    fnacimiento: String;
    recide :String;
    email: String;
    whatsapp: String;
    facebook: String;
    fotoURL: String;
    logoURL: String;
    acerca: String;

    constructor (nombre: String, apellido: String, tituloNivel :String, fnacimiento: String,
        recide :String, email: String, whatsapp: String, facebook: String,
        fotoURL: String, logoURL: String, acerca: String, id? : number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.tituloNivel = tituloNivel;
        this.fnacimiento = fnacimiento;
        this.recide = recide;
        this.email = email;
        this.whatsapp = whatsapp;
        this.facebook = facebook;
        this.fotoURL = fotoURL;
        this.logoURL = logoURL;
        this.acerca = acerca;
        this.id = id;
    }    
}