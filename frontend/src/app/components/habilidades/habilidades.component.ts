import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { habilidad } from 'src/app/model/habilidad.model';
import { HabilidadService } from 'src/app/service/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  aux :string[] = [];

  datos :habilidad[] = [];

  formularioHabilidad :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoHab = 0;
  //contiene el ultimo 'id' 
  private estadoIdHab = 0;

  constructor(public habService: HabilidadService, public builder :FormBuilder) {
    this.formularioHabilidad = this.builder.group({
      nombreHab : [''],
      porcentajeHab : ['']
    })
   }

  ngOnInit(): void {
   this.getHabilidad();
  }

  getHabilidad(){
    this.habService.allHabilidad().subscribe({
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
        console.log("Agregado");
        this.confirmaAgrega();
        this.estadoIdHab = 0;
        break;
      case 2:
        console.log("Editado");
        this.confirmaEdita();
        this.estadoIdHab = 0;
        break;
      case 3:
        console.log("Eliminado");
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
    if(this.estadoHab == 3 && this.estadoIdHab == id){
      this.oculta("formHabilidad");
      this.estadoHab = 0;
    }else{
      this.estadoHab = 3;
      this.estadoIdHab = id;
      this.renombraBoton('Eliminar');
      this.rellena(id);
      this.muestra("formHabilidad");
      this.formularioHabilidad.controls['nombreHab'].disable;
      this.formularioHabilidad.controls['porcentajeHab'];
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
      if (this.datos[d].idHab == id){x=d}
    }
    this.formularioHabilidad.controls['nombreHab'].setValue(this.datos[x].nombreHab);
    this.formularioHabilidad.controls['porcentajeHab'].setValue(this.datos[x].porcentajeHab);
  }

  private limpia(){
    this.formularioHabilidad.controls['nombreHab'].setValue('');
    this.formularioHabilidad.controls['porcentajeHab'].setValue('');
  }

  confirmaAgrega(){
    let hab :habilidad = new habilidad(
      this.formularioHabilidad.controls['nombreHab'].value,
      this.formularioHabilidad.controls['porcentajeHab'].value
    );
    this.habService.addHabilidad(hab).subscribe({
      next: (response: habilidad) => {
        console.log(response);
        this.getHabilidad();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let hab :habilidad = new habilidad(
      this.formularioHabilidad.controls['nombreHab'].value,
      this.formularioHabilidad.controls['porcentajeHab'].value,
      this.estadoIdHab
    );
  
    this.habService.updateHabilidad(hab).subscribe({
      next: (response: habilidad) => {
        console.log(response);
        this.getHabilidad();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaElimina(){
    this.habService.deleteHabilidad(this.estadoIdHab).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getHabilidad();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
}
