import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{

  visibilidad :string = "display:none;";
  ocutalParaEliminar :string = "display:block;";
  muestraParaEliminar :string = "display:none;";
  
  datos :proyecto[] = [];

  formularioProyecto :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoPro = 0;
  //contiene el ultimo 'id' 
  private estadoIdPro = 0;

  constructor(public proService: ProyectoService, public builder :FormBuilder, private token :TokenService) {
    this.formularioProyecto = this.builder.group({
      nombre : [''],
      url : [''],
      descripcion : ['']
    })
  }

  ngOnInit(): void {
    this.getProyecto();

    if(this.token.getAuthorities().toString() == "ROLE_ADMIN"){
      this.visibilidad = "display:block;";
    }else{
      this.visibilidad = "display:none;";
    }
  }

  getProyecto(){
    this.proService.allProyecto(environment.idPersona).subscribe({
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
        this.confirmaAgrega();
        this.estadoIdPro = 0;
        break;
      case 2:
        this.confirmaEdita();
        this.estadoIdPro = 0;
        break;
      case 3:
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
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormPro");
    elemento!.innerText="Agrega nuevo Proyecto";
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
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormPro");
    elemento!.innerText="Editar campos";
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
    this.ocutalParaEliminar = "display:none;";
    this.muestraParaEliminar = "display:block;";
    let tituloForm = document.getElementById("tituloFormPro");
    tituloForm!.innerText="Eliminar";
    let muestraElimina = document.getElementById("muestraEliminaPro");
    this.proService.getProyecto(environment.idPersona,id.toString()).subscribe({
      next: (response: proyecto) => {
        muestraElimina!.innerText=response.nombre;
      },
      error:()=>{
        muestraElimina!.innerText="Sin nombre";
      }
    });
    
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
      if (this.datos[d].id == id){x=d}
    }
    this.formularioProyecto.controls['nombre'].setValue(this.datos[x].nombre);
    this.formularioProyecto.controls['url'].setValue(this.datos[x].url);
    this.formularioProyecto.controls['descripcion'].setValue(this.datos[x].descripcion);
  }

  private limpia(){
    this.formularioProyecto.controls['nombre'].setValue('');
    this.formularioProyecto.controls['url'].setValue('');
    this.formularioProyecto.controls['descripcion'].setValue('');
  }

  confirmaAgrega(){
    let pro :proyecto = new proyecto(
      this.formularioProyecto.controls['nombre'].value,
      this.formularioProyecto.controls['url'].value,
      this.formularioProyecto.controls['descripcion'].value
    );
    this.proService.addProyecto(environment.idPersona, pro).subscribe({
      next: (response: proyecto) => {
        //console.log(response);
        this.getProyecto();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let pro :proyecto = new proyecto(
      this.formularioProyecto.controls['nombre'].value,
      this.formularioProyecto.controls['url'].value,
      this.formularioProyecto.controls['descripcion'].value,
      this.estadoIdPro
    );
    this.proService.updateProyecto(environment.idPersona, this.estadoIdPro.toString(), pro).subscribe({
      next: (response: proyecto) => {
        //console.log(response);
        this.getProyecto();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaElimina(){
    this.proService.deleteProyecto(environment.idPersona, this.estadoIdPro.toString())
    .pipe(finalize(()=>this.getProyecto())).subscribe({
      next: (response: void) => {
        //console.log(response);
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
