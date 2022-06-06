import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {
  private ids = ["16","17","16"];//sacamos este valor de la tabla persona(agregar)

  datos :experiencia[] = [];

  formularioExperiencia :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoExp = 0;
  //contiene el ultimo 'id' 
  private estadoIdExp = 0;

  constructor(public expService: ExperienciaService, public builder :FormBuilder) {
    this.formularioExperiencia = this.builder.group({
      nombreEmpresa : [''],
      puesto : [''],
      tipoJornal : [''],
      fechaIngresoEmpresa : [''],
      fechaEgresoEmpresa : [''],
      ubicacionEmpresa : [''],
      paisEmpresa : ['']
    })
   }

  ngOnInit(): void {
    let rta = this.expService.allExperiencia(this.ids);
    for(let r = 0; r < rta.length; r++){
      this.datos[r] = new experiencia("","","","","","","");
      rta[r].subscribe(data => {this.datos[r] = data});
    }
  }

  ejecuta(){
    switch(this.estadoExp){
      case 1:
        console.log("Agregado");
        break;
      case 2:
        console.log("Editado");
        break;
      case 3:
        console.log("Eliminado");
        break;
      default:
        break;
    }
    this.estadoExp = 0;
    this.estadoIdExp = 0;
    this.oculta("formExperiencia");
  }

  agregaExperiencia(){
    if(this.estadoExp == 1){
      this.oculta("formExperiencia");
      this.estadoExp = 0;
    }
    else{
      this.estadoExp = 1;
      this.renombraBoton('Agrega');
      this.limpia();
      this.muestra("formExperiencia");
    }
  };

  editaExperiencia(id : number = 0){
    if(this.estadoExp == 2 && this.estadoIdExp == id){
      this.oculta("formExperiencia");
      this.estadoExp = 0;
    }else{
      this.estadoExp = 2;
      this.estadoIdExp= id;
      this.renombraBoton('Editar');
      this.rellena(id);
      this.muestra("formExperiencia");
    }    
  }

  borraExperiencia(id :number = 0){
    if(this.estadoExp == 3 && this.estadoIdExp == id){
      this.oculta("formExperiencia");
      this.estadoExp = 0;
    }else{
      this.estadoExp = 3;
      this.estadoIdExp = id;
      this.renombraBoton('Eliminar');
      this.rellena(id);
      this.muestra("formExperiencia");
    }
  }

  private muestra(valorId :string){
    let elemento = document.getElementById(valorId);
    if(elemento!=null){
      elemento.style.display="block"
    }
  }

  private oculta(valorId :string){
    let elemento = document.getElementById(valorId);
    if(elemento!=null){
      elemento.style.display="none"
    }
  }

  private renombraBoton(nombre :string){
    let boton = document.getElementById('botonExp');
    if (boton != null){
      boton.innerText = nombre;
    }
  }

  private rellena(id :number){
    let x = this.ids.findIndex(r => r == String(id));
    this.formularioExperiencia.controls['nombreEmpresa'].setValue(this.datos[x].empresa);
    this.formularioExperiencia.controls['puesto'].setValue(this.datos[x].puesto);
    this.formularioExperiencia.controls['tipoJornal'].setValue(this.datos[x].jornada);
    this.formularioExperiencia.controls['fechaIngresoEmpresa'].setValue(this.datos[x].fingreso);
    this.formularioExperiencia.controls['fechaEgresoEmpresa'].setValue(this.datos[x].fegreso);
    this.formularioExperiencia.controls['ubicacionEmpresa'].setValue(this.datos[x].ubicacion);
    this.formularioExperiencia.controls['paisEmpresa'].setValue(this.datos[x].pais);
  }

  private limpia(){
    this.formularioExperiencia.controls['nombreEmpresa'].setValue('');
    this.formularioExperiencia.controls['puesto'].setValue('');
    this.formularioExperiencia.controls['tipoJornal'].setValue('');
    this.formularioExperiencia.controls['fechaIngresoEmpresa'].setValue('');
    this.formularioExperiencia.controls['fechaEgresoEmpresa'].setValue('');
    this.formularioExperiencia.controls['ubicacionEmpresa'].setValue('');
    this.formularioExperiencia.controls['paisEmpresa'].setValue('');

  }
}
