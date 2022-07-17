import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { habilidad } from 'src/app/model/habilidad.model';
import { HabilidadService } from 'src/app/service/habilidad.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  
  visibilidad :string = "display:none;";
  ocutalParaEliminar :string = "display:block;";
  muestraParaEliminar :string = "display:none;";

  datos :habilidad[] = [];

  formularioHabilidad :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoHab = 0;
  //contiene el ultimo 'id' 
  private estadoIdHab = 0;

  constructor(public habService: HabilidadService, public builder :FormBuilder, private token :TokenService) {
    this.formularioHabilidad = this.builder.group({
      nombre : [''],
      porcentaje : ['']
    })
   }

  ngOnInit(): void {
   this.getHabilidad();

   if(this.token.getAuthorities().toString() == "ROLE_ADMIN"){
    this.visibilidad = "display:block;";
  }else{
    this.visibilidad = "display:none;";
  }
  }

  getHabilidad(){
    this.habService.allHabilidad(environment.idPersona).subscribe({
      next:(Response: habilidad[])=>{
        this.datos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  ejecuta(){
    switch(this.estadoHab){
      case 1:
        this.confirmaAgrega();
        this.estadoIdHab = 0;
        break;
      case 2:
        this.confirmaEdita();
        this.estadoIdHab = 0;
        break;
      case 3:
        this.confirmaElimina();
        this.estadoHab = 0;
        break;
      default:
        break;
    }
    this.estadoHab = 0;
    this.estadoIdHab = 0;
    this.oculta("formHabilidad");
  }

  agregaHabilidad(){
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormHab");
    elemento!.innerText="Agrega nueva Habilidad";
    if(this.estadoHab == 1){
      this.oculta("formHabilidad");
      this.estadoHab = 0;
    }
    else{
      this.estadoHab = 1;
      this.renombraBoton('Agrega');
      this.limpia();
      this.muestra("formHabilidad");
    }
  };

  editaHabilidad(id : number = 0){
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormHab");
    elemento!.innerText="Editar campos";
    if(this.estadoHab == 2 && this.estadoIdHab == id){
      this.oculta("formHabilidad");
      this.estadoHab = 0;
    }else{
      this.estadoHab = 2;
      this.estadoIdHab= id;
      this.renombraBoton('Editar');
      this.rellena(id);
      this.muestra("formHabilidad");
    }    
  }

  borraHabilidad(id :number = 0){
    this.ocutalParaEliminar = "display:none;";
    this.muestraParaEliminar = "display:block;";
    let tituloForm = document.getElementById("tituloFormHab");
    tituloForm!.innerText="Eliminar";
    let muestraElimina = document.getElementById("muestraEliminaHab");
    this.habService.getHabilidad(environment.idPersona,id.toString()).subscribe({
      next: (response: habilidad) => {
        muestraElimina!.innerText=response.nombre;
      },
      error:()=>{
        muestraElimina!.innerText="Sin nombre";
      }
    });
    if(this.estadoHab == 3 && this.estadoIdHab == id){
      this.oculta("formHabilidad");
      this.estadoHab = 0;
    }else{
      this.estadoHab = 3;
      this.estadoIdHab = id;
      this.renombraBoton('Eliminar');
      this.rellena(id);
      this.muestra("formHabilidad");
      this.formularioHabilidad.controls['nombre'].disable;
      this.formularioHabilidad.controls['porcentaje'];
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
    let boton = document.getElementById('botonHab');
    if (boton != null){
      boton.innerText = nombre;
    }
  }

  private rellena(id :number){
    let x=0;
    for(let d=0;d<this.datos.length;d++){
      if (this.datos[d].id == id){x=d}
    }
    this.formularioHabilidad.controls['nombre'].setValue(this.datos[x].nombre);
    this.formularioHabilidad.controls['porcentaje'].setValue(this.datos[x].porcentaje);
  }

  private limpia(){
    this.formularioHabilidad.controls['nombre'].setValue('');
    this.formularioHabilidad.controls['porcentaje'].setValue('');
  }

  confirmaAgrega(){
    let hab :habilidad = new habilidad(
      this.formularioHabilidad.controls['nombre'].value,
      this.formularioHabilidad.controls['porcentaje'].value
    );
    this.habService.addHabilidad(environment.idPersona, hab).subscribe({
      next: (response: habilidad) => {
        //console.log(response);
        this.getHabilidad();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let hab :habilidad = new habilidad(
      this.formularioHabilidad.controls['nombre'].value,
      this.formularioHabilidad.controls['porcentaje'].value,
      this.estadoIdHab
    );
  
    this.habService.updateHabilidad(environment.idPersona, this.estadoIdHab.toString(), hab).subscribe({
      next: (response: habilidad) => {
        //console.log(response);
        this.getHabilidad();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaElimina(){
    this.habService.deleteHabilidad(environment.idPersona, this.estadoIdHab.toString())
    .pipe(finalize(()=>this.getHabilidad())).subscribe({
      next: (response: String) => {
        //console.log(response);
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
}
