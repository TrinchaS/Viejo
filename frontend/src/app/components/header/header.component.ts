import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  yo = "1";

  datos :persona = new persona("","","","","","","","","","","");

  formularioPerfil :FormGroup;

  constructor(public perService :PersonaService, private _builder :FormBuilder) {
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
    this.perService.getPersona(this.yo).subscribe(data => {this.datos = data});
  }

  actualizaPersona(){
    console.log("Actualiza Persona");
    this.muestraOculta("formPerfil");
  }

  muestraOculta(valorId:string):void{
    let elemento = document.getElementById(valorId);
    if(elemento!=null){
      let valor = getComputedStyle(elemento);

      if(valor.display=="none"){
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

        elemento.style.display="block";
      }
      else
        elemento.style.display="none";
    }
  }
}