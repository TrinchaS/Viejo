import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  idPersona:string = '1';
  
  visibilidad :string = "display:none;";

  datos :persona = new persona("","","","","","","","","","","");

  formularioPerfil :FormGroup;

  constructor(public perService :PersonaService, private _builder :FormBuilder, private token :TokenService) {
    this.formularioPerfil = this._builder.group({
      nombre:[''],
      apellido: [''],
      tituloNivel :[''],
      fnacimiento: [''],
      recide :[''],
      email: [''],
      whatsapp: [''],
      facebook: [''],
      fotoURL: [''],
      logoURL: [''],
      acerca: ['']
    });
  }

  ngOnInit(): void {
    this.getPersona();

    if(this.token.getAuthorities().toString() == "ROLE_ADMIN"){
      this.visibilidad = "display:block;";
    }else{
      this.visibilidad = "display:none;";
    }
  }
 
  getPersona(){
    this.perService.getPersona(this.idPersona).subscribe({
      next: (response: persona) => {
        this.datos = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  completaFormulario(){
    this.formularioPerfil.controls['nombre'].setValue(this.datos.nombre);
    this.formularioPerfil.controls['apellido'].setValue(this.datos.apellido);
    this.formularioPerfil.controls['tituloNivel'].setValue(this.datos.tituloNivel);
    this.formularioPerfil.controls['fnacimiento'].setValue(this.datos.fnacimiento);
    this.formularioPerfil.controls['recide'].setValue(this.datos.recide);
    this.formularioPerfil.controls['email'].setValue(this.datos.email);
    this.formularioPerfil.controls['whatsapp'].setValue(this.datos.whatsapp);
    this.formularioPerfil.controls['facebook'].setValue(this.datos.facebook);
    this.formularioPerfil.controls['fotoURL'].setValue(this.datos.fotoURL);
    this.formularioPerfil.controls['logoURL'].setValue(this.datos.logoURL);
    this.formularioPerfil.controls['acerca'].setValue(this.datos.acerca)
  }

  muestraOculta(valorId:string):void{
    let elemento = document.getElementById(valorId);
    if(elemento!=null){
      let valor = getComputedStyle(elemento);

      elemento.style.display= valor.display=="none" ? "block" : "none";
    }
  }

  actualiza(valorId:string){
    this.completaFormulario();
    this.muestraOculta(valorId);
  }

  confirma(formulario:string){
    let nuevo : persona = new persona (
      this.formularioPerfil.controls['nombre'].value,
      this.formularioPerfil.controls['apellido'].value,
      this.formularioPerfil.controls['tituloNivel'].value,
      this.formularioPerfil.controls['fnacimiento'].value,
      this.formularioPerfil.controls['recide'].value,
      this.formularioPerfil.controls['email'].value,
      this.formularioPerfil.controls['whatsapp'].value,
      this.formularioPerfil.controls['facebook'].value,
      this.formularioPerfil.controls['fotoURL'].value,
      this.formularioPerfil.controls['logoURL'].value,
      this.formularioPerfil.controls['acerca'].value,
      this.datos.id
    )

    this.perService.updatePersona(this.idPersona, nuevo).subscribe({
      next: (response: persona) => {
        this.getPersona();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })

    this.muestraOculta(formulario);
  }
  
}