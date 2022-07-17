import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Login } from 'src/app/model/login';
import { TokenDTO } from 'src/app/model/tokenDTO';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUsuario!: Login;
  nombreUsuario!: string;
  password!: string;
  roles: string[]=[];

  formLogin :FormGroup; 

  constructor(private tokenService:TokenService, private authService: AuthService, private formBuilder :FormBuilder, private ruta :Router) {
    
    this.formLogin = this.formBuilder.group({
      usernameOrEmail:['',[Validators.required,Validators.minLength(5)]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })

   }

  ngOnInit(): void {
  }

  onLogin():void{
    this.isLogged = false;
    this.isLogginFail = false;
    
    this.loginUsuario = new Login(
      this.formLogin.controls['usernameOrEmail'].value,
      this.formLogin.controls['password'].value);

    this.authService.login(this.loginUsuario).pipe(finalize(()=>this.redirecciona())).subscribe({
      next:(response: TokenDTO) => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(response.token);
        this.tokenService.setUserName(response.nombreUsuario);
        this.tokenService.setAuthorities(response.authorities);
        this.roles = response.authorities;
      },
      error:(error: HttpErrorResponse)=>{
        this.isLogged = false;
        this.isLogginFail = true;
        alert("Nombre de usuario o Contraseña incorecta.");
      }
    })

  }
  
  get Email(){
    return this.formLogin.get('usernameOrEmail');
  }

  get Password(){
    return this.formLogin.get('password');
  }

  redirecciona(){
    if(this.tokenService.getToken()){
      this.ruta.navigate(['/portfolio']);
    }
  }

  cancelar(){
    this.ruta.navigate(['/portfolio']);
  }

  registro(){
    this.ruta.navigate(['/registro']);
  }
}
