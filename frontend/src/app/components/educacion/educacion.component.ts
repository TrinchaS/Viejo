import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  idPersona:string = '1';

  visibilidad :string = "display:none;";
  ocutalParaEliminar :string = "display:block;";
  muestraParaEliminar :string = "display:none;";

  public datos :educacion [] = [];

  public editEducation: educacion | undefined;
  public deleteEducation: educacion | undefined;
  
  formularioEducacion :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoEdu = 0;
  //contiene el ultimo 'id' 
  private estadoIdEdu = 0;

  constructor(public eduService :EducacionService, public builder :FormBuilder, private token :TokenService) {
    this.formularioEducacion = this.builder.group({
      instituto :[''],
      titulo :[''],
      fingreso :[''],
      fegreso :['']
    });
  }

  ngOnInit(): void {
    this.getEducacion();

    if(this.token.getAuthorities().toString() == "ROLE_ADMIN"){
      this.visibilidad = "display:block;";
    }else{
      this.visibilidad = "display:none;";
    }
  }

  public getEducacion(){
    this.eduService.allEducacion(this.idPersona).subscribe({
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
        this.confirmaAgrega();
        this.estadoIdEdu=0;
        break;
      case 2:
        this.confirmaEdita();
        this.estadoIdEdu=0;
        break;
      case 3:
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
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormEdu");
    elemento!.innerText="Agrega nueva Educacion";
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
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormEdu");
    elemento!.innerText="Editar campos";
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
    this.ocutalParaEliminar = "display:none;";
    this.muestraParaEliminar = "display:block;";
    let tituloForm = document.getElementById("tituloFormEdu");
    tituloForm!.innerText="Eliminar";
    let muestraElimina = document.getElementById("muestraEliminaEdu");
    this.eduService.getEducacion(this.idPersona,id.toString()).subscribe({
      next: (response: educacion) => {
        muestraElimina!.innerText=response.titulo;
      },
      error:()=>{
        muestraElimina!.innerText="Sin nombre";
      }
    });
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
      if (this.datos[d].id == id){x=d}
    }
    this.formularioEducacion.controls['instituto'].setValue(this.datos[x].instituto);
    this.formularioEducacion.controls['titulo'].setValue(this.datos[x].titulo);
    this.formularioEducacion.controls['fingreso'].setValue(this.datos[x].fingreso);
    this.formularioEducacion.controls['fegreso'].setValue(this.datos[x].fegreso);
  }

  private limpia(){
    this.formularioEducacion.controls['instituto'].setValue('');
    this.formularioEducacion.controls['titulo'].setValue('');
    this.formularioEducacion.controls['fingreso'].setValue('');
    this.formularioEducacion.controls['fegreso'].setValue('');
  }

  confirmaElimina(){
    this.eduService.deleteEducacion(this.idPersona,this.estadoIdEdu.toString())
    .pipe(finalize(()=>this.getEducacion())).subscribe({
      next: (response: void) => {
        //console.log(response);
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let edu :educacion = new educacion(
      this.formularioEducacion.controls['instituto'].value ,
      this.formularioEducacion.controls['titulo'].value,
      this.formularioEducacion.controls['fingreso'].value,
      this.formularioEducacion.controls['fegreso'].value,
      this.estadoIdEdu);

    this.eduService.updateEducacion(this.idPersona,this.estadoIdEdu.toString(), edu).subscribe({
      next: (response: educacion) => {
        //console.log(response);
        this.getEducacion();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaAgrega(){
    let edu :educacion = new educacion(
      this.formularioEducacion.controls['instituto'].value ,
      this.formularioEducacion.controls['titulo'].value,
      this.formularioEducacion.controls['fingreso'].value,
      this.formularioEducacion.controls['fegreso'].value,
    );

    this.eduService.addEducacion(this.idPersona,edu).subscribe({
      next: (response: educacion) => {
        //console.log(response);
        this.getEducacion();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })

  }
}
