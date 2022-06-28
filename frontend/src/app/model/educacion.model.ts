export class educacion{
    idEdu?: number;
    institutoEdu: string;
    tituloEdu: string;
    fingresoEdu: string;
    fegresoEdu: string;

    constructor (institutoEdu: string, tituloEdu: string, fingresoEdu: string, fegresoEdu: string, idEdu?: number) {
        this.institutoEdu = institutoEdu;
        this.tituloEdu = tituloEdu;
        this.fingresoEdu = fingresoEdu;
        this.fegresoEdu = fegresoEdu;
        this.idEdu = idEdu;
    }
}