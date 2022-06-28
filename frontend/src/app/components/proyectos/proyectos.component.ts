import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{

  datos :proyecto[] = [];

  formularioProyecto :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoPro = 0;
  //contiene el ultimo 'id' 
  private estadoIdPro = 0;

  constructor(public proService: ProyectoService, public builder :FormBuilder) {
    this.formularioProyecto = this.builder.group({
      nombrePro : [''],
      urlPro : [''],
      descripcionPro : ['']
    })
  }

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto(){
    this.proService.allProyecto().subscribe({
      next:(response: proyecto[])=>{
        this.datos=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  ejecuta(){
    switch(this.estadoPro){
      case 1:
        console.log("Agregado");
        this.confirmaAgrega();
        this.estadoIdPro = 0;
        break;
      case 2:
        console.log("Editado");
        this.confirmaEdita();
        this.estadoIdPro = 0;
        break;
      case 3:
        console.log("Eliminado");
        this.confirmaElimina();
        this.estadoIdPro;
        break;
      default:
        break;
    }
    this.estadoPro = 0;
    this.estadoIdPro = 0;
    this.oculta("formProyecto");
  }

  agregaProyecto(){
    if(this.estadoPro == 1){
      this.oculta("formProyecto");
      this.estadoPro = 0;
    }
    else{
      this.estadoPro = 1;
      this.renombraBoton('Agrega');
      this.limpia();
      this.muestra("formProyecto");
    }
  };

  editaProyecto(id : number = 0){
    if(this.estadoPro == 2 && this.estadoIdPro == id){
      this.oculta("formProyecto");
      this.estadoPro = 0;
    }else{
      this.estadoPro = 2;
      this.estadoIdPro= id;
      this.renombraBoton('Editar');
      this.rellena(id);
      this.muestra("formProyecto");
    }    
  }

  borraProyecto(id :number = 0){
    if(this.estadoPro == 3 && this.estadoIdPro == id){
      this.oculta("formProyecto");
      this.estadoPro = 0;
    }else{
      this.estadoPro = 3;
      this.estadoIdPro = id;
      this.renombraBoton('Eliminar');
      this.rellena(id);
      this.muestra("formProyecto");
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
    let boton = document.getElementById('botonPro');
    if (boton != null){
      boton.innerText = nombre;
    }
  }

  private rellena(id :number){
    let x=0;
    for(let d=0;d<this.datos.length;d++){
      if (this.datos[d].idPro == id){x=d}
    }
    this.formularioProyecto.controls['nombrePro'].setValue(this.datos[x].nombrePro);
    this.formularioProyecto.controls['urlPro'].setValue(this.datos[x].urlPro);
    this.formularioProyecto.controls['descripcionPro'].setValue(this.datos[x].descripcionPro);
  }

  private limpia(){
    this.formularioProyecto.controls['nombrePro'].setValue('');
    this.formularioProyecto.controls['urlPro'].setValue('');
    this.formularioProyecto.controls['descripcionPro'].setValue('');
  }

  confirmaAgrega(){
    let pro :proyecto = new proyecto(
      this.formularioProyecto.controls['nombrePro'].value,
      this.formularioProyecto.controls['urlPro'].value,
      this.formularioProyecto.controls['descripcionPro'].value
    );
    this.proService.addProyecto(pro).subscribe({
      next: (response: proyecto) => {
        console.log(response);
        this.getProyecto();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let pro :proyecto = new proyecto(
      this.formularioProyecto.controls['nombrePro'].value,
      this.formularioProyecto.controls['urlPro'].value,
      this.formularioProyecto.controls['descripcionPro'].value,
      this.estadoIdPro
    );
    this.proService.updateProyecto(pro).subscribe({
      next: (response: proyecto) => {
        console.log(response);
        this.getProyecto();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaElimina(){
    this.proService.deleteProyecto(this.estadoIdPro).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProyecto();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
