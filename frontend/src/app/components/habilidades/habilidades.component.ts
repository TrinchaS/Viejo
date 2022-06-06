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

  private ids = ["21","22","23"];//sacamos este valor de la tabla persona(agregar)

  aux :string[] = [];

  datos :habilidad[] = [];

  formularioHabilidad :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoHab = 0;
  //contiene el ultimo 'id' 
  private estadoIdHab = 0;

  constructor(public habService: HabilidadService, public builder :FormBuilder) {
    this.formularioHabilidad = this.builder.group({
      nombre : [''],
      porcentaje : ['']
    })
   }

  ngOnInit(): void {
    let rta = this.habService.allHabilidad(this.ids);
    for(let r = 0; r < rta.length; r++){
      this.datos[r] = new habilidad("","");
      rta[r].subscribe(data => {this.datos[r] = data});
    }
  }

  ejecuta(){
    switch(this.estadoHab){
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
    let x = this.ids.findIndex(r => r == String(id));
    this.formularioHabilidad.controls['nombre'].setValue(this.datos[x].nombre);
    this.formularioHabilidad.controls['porcentaje'].setValue(this.datos[x].porcentaje);
  }

  private limpia(){
    this.formularioHabilidad.controls['nombre'].setValue('');
    this.formularioHabilidad.controls['porcentaje'].setValue('');
  }

}
