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
  private ids = ["18","19","20"]; //sacamos este valor de la tabla persona

  datos :educacion [] = [];
  
  formularioEducacion :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoEdu = 0;
  //contiene el ultimo 'id' 
  private estadoIdEdu = 0;

  constructor(public eduService :EducacionService, public builder :FormBuilder) {
    this.formularioEducacion = this.builder.group({
      instituto :[''],
      titulo :[''],
      fIngreso :[''],
      fEgreso :['']
    });
  }

  ngOnInit(): void {
    let rta = this.eduService.allEducacion(this.ids);
    for(let r = 0; r < rta.length; r++){
      this.datos[r] = new educacion("","","","");
      rta[r].subscribe(data => {this.datos[r] = data});
    }
  }

  ejecuta(){
    switch(this.estadoEdu){
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
    let x = this.ids.findIndex(r => r == String(id));
    this.formularioEducacion.controls['instituto'].setValue(this.datos[x].instituto);
    this.formularioEducacion.controls['titulo'].setValue(this.datos[x].titulo);
    this.formularioEducacion.controls['fIngreso'].setValue(this.datos[x].fingreso);
    this.formularioEducacion.controls['fEgreso'].setValue(this.datos[x].fegreso);
  }

  private limpia(){
    this.formularioEducacion.controls['instituto'].setValue('');
    this.formularioEducacion.controls['titulo'].setValue('');
    this.formularioEducacion.controls['fIngreso'].setValue('');
    this.formularioEducacion.controls['fEgreso'].setValue('');
  }
}
