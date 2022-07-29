import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiBaseURL :string = 'https://portfolio-cesarodrullan.herokuapp.com';

  private apiServerURL = this.apiBaseURL;
  
  constructor(private http :HttpClient) {
  }

  public getPersona(id :string) :Observable<persona>{
    return this.http.get<persona>(`${this.apiServerURL}/persona/buscarPersona/${id}`);
  }

  public updatePersona(id :string, pers :persona) :Observable<persona>{
    return this.http.put<persona>(`${this.apiServerURL}/persona/editarPersona/${id}`,pers);

  }
} 
