import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiServerURL = environment.apiBaseURL;
  
  constructor(private http :HttpClient) {
  }

  public getPersona(id :string) :Observable<persona>{
    return this.http.get<persona>(`${this.apiServerURL}/persona/buscarPersona/${id}`);
  }

  public updatePersona(id :string, pers :persona) :Observable<persona>{
    return this.http.put<persona>(`${this.apiServerURL}/persona/editarPersona/${id}`,pers);

  }
} 
