import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public datos :educacion [] = [];

  public editEducation: educacion | undefined;
  public deleteEducation: educacion | undefined;
  
  formularioEducacion :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoEdu = 0;
  //contiene el ultimo 'id' 
  private estadoIdEdu = 0;

  constructor(public eduService :EducacionService, public builder :FormBuilder) {
    this.formularioEducacion = this.builder.group({
      institutoEdu :[''],
      tituloEdu :[''],
      fingresoEdu :[''],
      fegresoEdu :['']
    });
  }

  ngOnInit(): void {
    this.getEducacion();
  }

  public getEducacion(){
    this.eduService.allEducacion().subscribe({
      next:(Response: educacion[])=>{
        this.datos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  ejecuta(){
    switch(this.estadoEdu){
      case 1:
        console.log("Agregando");
        this.confirmaAgrega();
        this.estadoIdEdu=0;
        break;
      case 2:
        console.log("Editando");
        this.confirmaEdita();
        this.estadoIdEdu=0;
        break;
      case 3:
        console.log("Eliminando");
        this.confirmaElimina();
        this.estadoEdu = 0;
        break;
      default:
        break;
    }
    this.estadoEdu = 0;
    this.estadoIdEdu = 0;
    this.oculta("formEducacion");
  }

  agregaEducacion(){
    if(this.estadoEdu == 1){
      this.oculta("formEducacion");
      this.estadoEdu = 0;
    }
    else{
      this.estadoEdu = 1;
      this.renombraBoton('Agrega');
      this.limpia();
      this.muestra("formEducacion");
    }
  };

  editaEducacion(id : number = 0){
    if(this.estadoEdu == 2 && this.estadoIdEdu == id){
      this.oculta("formEducacion");
      this.estadoEdu = 0;
    }else{
      this.estadoEdu = 2;
      this.estadoIdEdu = id;
      this.renombraBoton('Editar');
      this.rellena(id);
      this.muestra("formEducacion");
    }    
  }

  borraEducacion(id :any){
    if(this.estadoEdu == 3 && this.estadoIdEdu == id){
      this.oculta("formEducacion");
      this.estadoEdu = 0;
    }else{
      this.estadoEdu = 3;
      this.estadoIdEdu = id;
      this.renombraBoton('Eliminar');
      this.rellena(id);
      this.muestra("formEducacion");
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
    let boton = document.getElementById('botonEdu');
    if (boton != null){
      boton.innerText = nombre;
    }
  }

  private rellena(id :number){
    let x=0;
    for(let d=0;d<this.datos.length;d++){
      if (this.datos[d].idEdu == id){x=d}
    }
    this.formularioEducacion.controls['institutoEdu'].setValue(this.datos[x].institutoEdu);
    this.formularioEducacion.controls['tituloEdu'].setValue(this.datos[x].tituloEdu);
    this.formularioEducacion.controls['fingresoEdu'].setValue(this.datos[x].fingresoEdu);
    this.formularioEducacion.controls['fegresoEdu'].setValue(this.datos[x].fegresoEdu);
  }

  private limpia(){
    this.formularioEducacion.controls['institutoEdu'].setValue('');
    this.formularioEducacion.controls['tituloEdu'].setValue('');
    this.formularioEducacion.controls['fingresoEdu'].setValue('');
    this.formularioEducacion.controls['fegresoEdu'].setValue('');
  }

  confirmaElimina(){
    this.eduService.deleteEducacion(this.estadoIdEdu).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEducacion();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let edu :educacion = new educacion(
      this.formularioEducacion.controls['institutoEdu'].value ,
      this.formularioEducacion.controls['tituloEdu'].value,
      this.formularioEducacion.controls['fingresoEdu'].value,
      this.formularioEducacion.controls['fegresoEdu'].value,
      this.estadoIdEdu);

    this.eduService.updateEducacion(edu).subscribe({
      next: (response: educacion) => {
        console.log(response);
        this.getEducacion();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaAgrega(){
    let edu :educacion = new educacion(
      this.formularioEducacion.controls['institutoEdu'].value ,
      this.formularioEducacion.controls['tituloEdu'].value,
      this.formularioEducacion.controls['fingresoEdu'].value,
      this.formularioEducacion.controls['fegresoEdu'].value,
    );

    this.eduService.addEducacion(edu).subscribe({
      next: (response: educacion) => {
        console.log(response);
        this.getEducacion();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })

  }
}
