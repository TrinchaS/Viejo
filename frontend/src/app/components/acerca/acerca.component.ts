import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  yo = "1";

  datos :persona = new persona("","","","","","","","","","","");

  //estados 0:nada 1:edita
  private estadoAce = 0;

  formularioAcerca :FormGroup;

  constructor(public perService :PersonaService, private builder :FormBuilder) {
    this.formularioAcerca = this.builder.group({
      acerca: ['']
    });
  }

  ngOnInit(): void {
    this.perService.getPersona(this.yo).subscribe(data => {this.datos = data});
  }

  actualiza(){
    console.log("actualiza Acerca");
    this.muestraOculta("formAcerca");
  }

  muestraOculta(valorId:string):void{
    let elemento = document.getElementById(valorId);
    if(elemento!=null){
      let valor = getComputedStyle(elemento);
      if(valor.display=="none"){
        this.formularioAcerca.controls['acerca'].setValue(this.datos.acerca);
        elemento.style.display="block";
      }
      else
        elemento.style.display="none";
    }
  }
}
