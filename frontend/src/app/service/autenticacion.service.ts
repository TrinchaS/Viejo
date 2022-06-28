import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiServerURL = environment.apiBaseURL;
  private url = this.apiServerURL+'/auth/login';
  currentUserSubject :BehaviorSubject<any>;

  constructor(private http :HttpClient) {
    console.log("El servicion de autenticacion esta corriendo.");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
  }

  IniciarSesion(credenciales :any):Observable<any>{

    return this.http.post(this.url,credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser',JSON.stringify(data));
      return data;
    }))
  }

}
