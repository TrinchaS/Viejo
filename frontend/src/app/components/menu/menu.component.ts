import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  yo = "1";

  datos :persona = new persona("","","","","","","","","","","");

  constructor(public perService :PersonaService) { }

  ngOnInit(): void {
    this.perService.getPersona(this.yo).subscribe(data => {this.datos = data});
  }

}
