import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin :FormGroup; 

  constructor(private formBuilder :FormBuilder, private autService:AutenticacionService, private ruta :Router) {
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      deviceInfo:this.formBuilder.group({
        deviceId: ["12312314143"],
        deviceType: ["DEVICE_TYPE_ANDROID"],
        notificationToken: ["878878adffafa"]
      })
    })
   }

  ngOnInit(): void {
  }

  get Email(){
    return this.formLogin.get('email');
  }

  get Password(){
    return this.formLogin.get('password');
  }

  onEnviar(event :Event){
    event.preventDefault;
    this.autService.IniciarSesion(this.formLogin.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['/portfolio']);     
    });
  }
}
