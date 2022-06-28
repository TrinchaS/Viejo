export class persona{
    idPer?: number;
    nombrePer: String;
    apellidoPer: String;
    tituloNivelPer :String;
    fnacimientoPer: String;
    recidePer :String;
    emailPer: String;
    whatsappPer: String;
    facebookPer: String;
    fotoURLPer: String;
    logoURLPer: String;
    acercaPer: String;

    constructor (nombre: String, apellido: String, tituloNivel :String, fnacimiento: String,
        recide :String, email: String, whatsapp: String, facebook: String,
        fotoURL: String, logoURL: String, acerca: String, id? : number){
        this.nombrePer = nombre;
        this.apellidoPer = apellido;
        this.tituloNivelPer = tituloNivel;
        this.fnacimientoPer = fnacimiento;
        this.recidePer = recide;
        this.emailPer = email;
        this.whatsappPer = whatsapp;
        this.facebookPer = facebook;
        this.fotoURLPer = fotoURL;
        this.logoURLPer = logoURL;
        this.acercaPer = acerca;
        this.idPer = id;
    }    
}