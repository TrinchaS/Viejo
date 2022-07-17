import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';
import { TokenDTO } from '../model/tokenDTO';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = environment.apiBaseURL + '/auth';

  constructor(private httpCliente: HttpClient) {}

  public nuevo(nuevoUsuario: Usuario):Observable<void>{
    return this.httpCliente.post<void>(this.authURL + '/registrar', nuevoUsuario);
  }
  
  public login(loginUsuario: Login): Observable<TokenDTO>{
    return this.httpCliente.post<TokenDTO>(this.authURL + '/iniciarSesion', loginUsuario);
  }
   
}
