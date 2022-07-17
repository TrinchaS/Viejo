import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuarioNuevo! :Usuario ; //tendre que definir un nuevo tipo de dato regitroDTO

  correcto :boolean = false;

  formRegister :FormGroup; 

  constructor(private formBuilder :FormBuilder, private authService: AuthService, private ruta :Router) {

    this.formRegister = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      username:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.minLength(5),Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      password2:['',[Validators.required,Validators.minLength(5)]]
    })


  }

  ngOnInit(): void {
  }

  enviar(){
    let pass1 :string;
    let pass2 :string;
    pass1 = this.formRegister.controls['password'].value;
    pass2 = this.formRegister.controls['password2'].value;

    if (pass1 == pass2){
      this.usuarioNuevo = new Usuario(
        this.formRegister.controls['nombre'].value,
        this.formRegister.controls['username'].value,
        this.formRegister.controls['email'].value,
        this.formRegister.controls['password'].value
      )
  
      this.authService.nuevo(this.usuarioNuevo).pipe(finalize(()=>this.redirecciona())).subscribe({
        next:(response: void) => {
          this.correcto = true
        },
        error:(error: HttpErrorResponse)=>{
          alert("Nombre de usuario o email ya registrado.\nO no completo todos los campos.");
        }
      })
    }
    else{
      alert("La contraseña no coincide.");
    }
  }

  get Nombre(){
    return this.formRegister.get('nombre');
  }

  get Username(){
    return this.formRegister.get('username');
  }

  get Email(){
    return this.formRegister.get('email');
  }

  get Password(){
    return this.formRegister.get('password');
  }

  get Password2(){
    return this.formRegister.get('password2');
  }

  redirecciona(){
    if(this.correcto){
      this.ruta.navigate(['/login']);
    }
  }

  cancelar(){
    this.ruta.navigate(['/portfolio']);
  }

}
