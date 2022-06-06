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
  private ids = ["24","25"];//sacamos este valor de la tabla persona(agregar)

  datos :proyecto[] = [];

  formularioProyecto :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoPro = 0;
  //contiene el ultimo 'id' 
  private estadoIdPro = 0;

  constructor(public proService: ProyectoService, public builder :FormBuilder) {
    this.formularioProyecto = this.builder.group({
      nombreProyecto : [''],
      urlProyecto : [''],
      descripcionProyecto : ['']
    })
  }

  ngOnInit(): void {
    let rta = this.proService.allProyecto(this.ids);
    for(let r = 0; r < rta.length; r++){
      this.datos[r] = new proyecto("","","");
      rta[r].subscribe(data => {this.datos[r] = data});
    }
  }

  ejecuta(){
    switch(this.estadoPro){
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
    let x = this.ids.findIndex(r => r == String(id));
    this.formularioProyecto.controls['nombreProyecto'].setValue(this.datos[x].nombre);
    this.formularioProyecto.controls['urlProyecto'].setValue(this.datos[x].url);
    this.formularioProyecto.controls['descripcionProyecto'].setValue(this.datos[x].descripcion);
  }

  private limpia(){
    this.formularioProyecto.controls['nombreProyecto'].setValue('');
    this.formularioProyecto.controls['urlProyecto'].setValue('');
    this.formularioProyecto.controls['descripcionProyecto'].setValue('');

  }
}
