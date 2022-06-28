import { HttpErrorResponse } from '@angular/common/http';
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

  datos :experiencia[] = [];

  formularioExperiencia :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoExp = 0;
  //contiene el ultimo 'id' 
  private estadoIdExp = 0;

  constructor(public expService: ExperienciaService, public builder :FormBuilder) {
    this.formularioExperiencia = this.builder.group({
      puestoExp : [''],
      empresaExp : [''],
      jornadaExp : [''],
      fingresoExp : [''],
      fegresoExp : [''],
      ubicacionExp : [''],
      paisExp : [''],
      descripcionExp : ['']
    })
   }

  ngOnInit(): void {
    this.getExperiencia();
  }

  getExperiencia(){
    this.expService.allExperiencia().subscribe({
      next:(response: experiencia[])=>{
        this.datos=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  ejecuta(){
    switch(this.estadoExp){
      case 1:
        console.log("Agregado");
        this.confirmaAgrega();
        this.estadoIdExp = 0;
        break;
      case 2:
        console.log("Editado");
        this.confirmaEdita();
        this.estadoIdExp = 0;
        break;
      case 3:
        console.log("Eliminado");
        this.confirmaElimina();
        this.estadoIdExp = 0;
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
    let x=0;
    for(let d=0;d<this.datos.length;d++){
      if (this.datos[d].idExp == id){x=d}
    }
    this.formularioExperiencia.controls['empresaExp'].setValue(this.datos[x].empresaExp);
    this.formularioExperiencia.controls['puestoExp'].setValue(this.datos[x].puestoExp);
    this.formularioExperiencia.controls['jornadaExp'].setValue(this.datos[x].jornadaExp);
    this.formularioExperiencia.controls['fingresoExp'].setValue(this.datos[x].fingresoExp);
    this.formularioExperiencia.controls['fegresoExp'].setValue(this.datos[x].fegresoExp);
    this.formularioExperiencia.controls['ubicacionExp'].setValue(this.datos[x].ubicacionExp);
    this.formularioExperiencia.controls['paisExp'].setValue(this.datos[x].paisExp);
    this.formularioExperiencia.controls['descripcionExp'].setValue(this.datos[x].descripcionExp);
  }

  private limpia(){
    this.formularioExperiencia.controls['empresaExp'].setValue('');
    this.formularioExperiencia.controls['puestoExp'].setValue('');
    this.formularioExperiencia.controls['jornadaExp'].setValue('');
    this.formularioExperiencia.controls['fingresoExp'].setValue('');
    this.formularioExperiencia.controls['fegresoExp'].setValue('');
    this.formularioExperiencia.controls['ubicacionExp'].setValue('');
    this.formularioExperiencia.controls['paisExp'].setValue('');
    this.formularioExperiencia.controls['descripcionExp'].setValue('');
    
  }

  confirmaAgrega(){
    let exp :experiencia = new experiencia(
      this.formularioExperiencia.controls['puestoExp'].value,
      this.formularioExperiencia.controls['empresaExp'].value,
      this.formularioExperiencia.controls['jornadaExp'].value,
      this.formularioExperiencia.controls['fingresoExp'].value,
      this.formularioExperiencia.controls['fegresoExp'].value,
      this.formularioExperiencia.controls['ubicacionExp'].value,
      this.formularioExperiencia.controls['paisExp'].value,
      this.formularioExperiencia.controls['descripcionExp'].value
    );
    this.expService.addExperiencia(exp).subscribe({
      next: (response: experiencia) => {
        console.log(response);
        this.getExperiencia();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let exp :experiencia = new experiencia(
      this.formularioExperiencia.controls['puestoExp'].value,
      this.formularioExperiencia.controls['empresaExp'].value,
      this.formularioExperiencia.controls['jornadaExp'].value,
      this.formularioExperiencia.controls['fingresoExp'].value,
      this.formularioExperiencia.controls['fegresoExp'].value,
      this.formularioExperiencia.controls['ubicacionExp'].value,
      this.formularioExperiencia.controls['paisExp'].value,
      this.formularioExperiencia.controls['descripcionExp'].value,
      this.estadoIdExp
    );
    this.expService.updateExperiencia(exp).subscribe({
      next: (response: experiencia) => {
        console.log(response);
        this.getExperiencia();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaElimina(){
    this.expService.deleteExperiencia(this.estadoIdExp).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiencia();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
