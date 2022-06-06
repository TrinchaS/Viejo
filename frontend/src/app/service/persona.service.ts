import { HttpClient, HttpParams, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = "http://localhost:8080/";

  constructor(private http :HttpClient) {}

  public getPersona(id:string) :Observable<persona>{
    return this.http.get<persona>(`${this.url}buscaPersona/${id}`);
  }

}
