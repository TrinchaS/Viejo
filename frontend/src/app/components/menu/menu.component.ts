import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged: Boolean = false;

  datos :persona = new persona("","","","","","","","","","","");

  constructor(public perService :PersonaService, private router :Router, private token :TokenService) { }

  ngOnInit(): void {
    this.perService.getPersona(environment.idPersona).subscribe(data => {this.datos = data});
    
    if(this.token.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
  }

  login():void{
    this.router.navigate(['/login']);
  }

  logout():void{
    this.isLogged = false;
    this.token.logOut();
    window.location.reload();
  }

}
