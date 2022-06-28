import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  yo = "1";

  datos :persona = new persona("","","","","","","","","","","");

  formularioPerfil :FormGroup;

  constructor(public perService :PersonaService, private _builder :FormBuilder) {
    this.formularioPerfil = this._builder.group({
      nombrePer:[''],
      apellidoPer: [''],
      tituloNivelPer :[''],
      fnacimientoPer: [''],
      recidePer :[''],
      emailPer: [''],
      whatsappPer: [''],
      facebookPer: [''],
      fotoURLPer: [''],
      logoURLPer: [''],
      acercaPer: ['']
    });
  }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona(){
    this.perService.getPersona(this.yo).subscribe({
      next: (response: persona) => {
        this.datos = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  completaFormulario(){
    this.formularioPerfil.controls['nombrePer'].setValue(this.datos.nombrePer);
    this.formularioPerfil.controls['apellidoPer'].setValue(this.datos.apellidoPer);
    this.formularioPerfil.controls['tituloNivelPer'].setValue(this.datos.tituloNivelPer);
    this.formularioPerfil.controls['fnacimientoPer'].setValue(this.datos.fnacimientoPer);
    this.formularioPerfil.controls['recidePer'].setValue(this.datos.recidePer);
    this.formularioPerfil.controls['emailPer'].setValue(this.datos.emailPer);
    this.formularioPerfil.controls['whatsappPer'].setValue(this.datos.whatsappPer);
    this.formularioPerfil.controls['facebookPer'].setValue(this.datos.facebookPer);
    this.formularioPerfil.controls['fotoURLPer'].setValue(this.datos.fotoURLPer);
    this.formularioPerfil.controls['logoURLPer'].setValue(this.datos.logoURLPer);
    this.formularioPerfil.controls['acercaPer'].setValue(this.datos.acercaPer)
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

  confirma(valorId:string){
    let nuevo : persona = new persona (
      this.formularioPerfil.controls['nombrePer'].value,
      this.formularioPerfil.controls['apellidoPer'].value,
      this.formularioPerfil.controls['tituloNivelPer'].value,
      this.formularioPerfil.controls['fnacimientoPer'].value,
      this.formularioPerfil.controls['recidePer'].value,
      this.formularioPerfil.controls['emailPer'].value,
      this.formularioPerfil.controls['whatsappPer'].value,
      this.formularioPerfil.controls['facebookPer'].value,
      this.formularioPerfil.controls['fotoURLPer'].value,
      this.formularioPerfil.controls['logoURLPer'].value,
      this.formularioPerfil.controls['acercaPer'].value,
      this.datos.idPer
    )

    this.perService.updatePersona(nuevo).subscribe({
      next: (response: persona) => {
        console.log(response);
        this.getPersona();
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })

    this.muestraOculta(valorId);
  }
  
}