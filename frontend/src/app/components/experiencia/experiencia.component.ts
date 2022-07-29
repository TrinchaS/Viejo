import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {

  idPersona:string = '1';

  visibilidad :string = "display:none;";
  ocutalParaEliminar :string = "display:block;";
  muestraParaEliminar :string = "display:none;";

  datos :experiencia[] = [];

  formularioExperiencia :FormGroup;

  //estados 0:nada 1:agrega 2:edita 3:borra
  private estadoExp = 0;
  //contiene el ultimo 'id' 
  private estadoIdExp = 0;

  constructor(public expService: ExperienciaService, public builder :FormBuilder, private token :TokenService) {
    this.formularioExperiencia = this.builder.group({
      puesto : [''],
      empresa : [''],
      jornada : [''],
      fingreso : [''],
      fegreso : [''],
      ubicacion : [''],
      pais : [''],
      descripcion : ['']
    })
   }

  ngOnInit(): void {
    this.getExperiencia();

    if(this.token.getAuthorities().toString() == "ROLE_ADMIN"){
      this.visibilidad = "display:block;";
    }else{
      this.visibilidad = "display:none;";
    }
  }

  getExperiencia(){
    this.expService.allExperiencia(this.idPersona).subscribe({
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
        this.confirmaAgrega();
        this.estadoIdExp = 0;
        break;
      case 2:
        this.confirmaEdita();
        this.estadoIdExp = 0;
        break;
      case 3:
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
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormExp");
    elemento!.innerText="Agrega nueva experiencia";
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
    this.ocutalParaEliminar = "display:block;";
    this.muestraParaEliminar = "display:none;";
    let elemento = document.getElementById("tituloFormExp");
    elemento!.innerText="Editar campos";
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
    this.ocutalParaEliminar = "display:none;";
    this.muestraParaEliminar = "display:block;";
    let tituloForm = document.getElementById("tituloFormExp");
    tituloForm!.innerText="Eliminar";
    let muestraElimina = document.getElementById("muestraEliminaExp");
    this.expService.getExperiencia(this.idPersona,id.toString()).subscribe({
      next: (response: experiencia) => {
        muestraElimina!.innerText=response.puesto;
      },
      error:()=>{
        muestraElimina!.innerText="Sin nombre";
      }
    });
    
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
      if (this.datos[d].id == id){x=d}
    }
    this.formularioExperiencia.controls['empresa'].setValue(this.datos[x].empresa);
    this.formularioExperiencia.controls['puesto'].setValue(this.datos[x].puesto);
    this.formularioExperiencia.controls['jornada'].setValue(this.datos[x].jornada);
    this.formularioExperiencia.controls['fingreso'].setValue(this.datos[x].fingreso);
    this.formularioExperiencia.controls['fegreso'].setValue(this.datos[x].fegreso);
    this.formularioExperiencia.controls['ubicacion'].setValue(this.datos[x].ubicacion);
    this.formularioExperiencia.controls['pais'].setValue(this.datos[x].pais);
    this.formularioExperiencia.controls['descripcion'].setValue(this.datos[x].descripcion);
  }

  private limpia(){
    this.formularioExperiencia.controls['empresa'].setValue('');
    this.formularioExperiencia.controls['puesto'].setValue('');
    this.formularioExperiencia.controls['jornada'].setValue('');
    this.formularioExperiencia.controls['fingreso'].setValue('');
    this.formularioExperiencia.controls['fegreso'].setValue('');
    this.formularioExperiencia.controls['ubicacion'].setValue('');
    this.formularioExperiencia.controls['pais'].setValue('');
    this.formularioExperiencia.controls['descripcion'].setValue('');
    
  }

  confirmaAgrega(){
    let exp :experiencia = new experiencia(
      this.formularioExperiencia.controls['puesto'].value,
      this.formularioExperiencia.controls['empresa'].value,
      this.formularioExperiencia.controls['jornada'].value,
      this.formularioExperiencia.controls['fingreso'].value,
      this.formularioExperiencia.controls['fegreso'].value,
      this.formularioExperiencia.controls['ubicacion'].value,
      this.formularioExperiencia.controls['pais'].value,
      this.formularioExperiencia.controls['descripcion'].value
    );
    this.expService.addExperiencia(this.idPersona, exp).subscribe({
      next: (response: experiencia) => {
        //console.log(response);
        this.getExperiencia();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  confirmaEdita(){
    let exp :experiencia = new experiencia(
      this.formularioExperiencia.controls['puesto'].value,
      this.formularioExperiencia.controls['empresa'].value,
      this.formularioExperiencia.controls['jornada'].value,
      this.formularioExperiencia.controls['fingreso'].value,
      this.formularioExperiencia.controls['fegreso'].value,
      this.formularioExperiencia.controls['ubicacion'].value,
      this.formularioExperiencia.controls['pais'].value,
      this.formularioExperiencia.controls['descripcion'].value,
      this.estadoIdExp
    );
    this.expService.updateExperiencia(this.idPersona,this.estadoIdExp.toString(), exp).subscribe({
      next: (response: experiencia) => {
        //console.log(response);
        this.getExperiencia();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  
  confirmaElimina(){
    this.expService.deleteExperiencia(this.idPersona, this.estadoIdExp.toString())
    .pipe(finalize(()=>this.getExperiencia())).subscribe({
      next: (response: void) => {
        //console.log(response);
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
