import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerURL = environment.apiBaseURL;

  constructor(private http :HttpClient) {}

  
  public getExperiencia(personaID :string, experienciaID :string) :Observable<experiencia>{
    return this.http.get<experiencia>(`${this.apiServerURL}/experiencia/buscarExperiencia/${personaID}/${experienciaID}`);
  }
  

  public allExperiencia(idPersona :string):Observable<experiencia[]>{
    return this.http.get<experiencia[]>(`${this.apiServerURL}/experiencia/verExperiencias/${idPersona}`);
  }

  public addExperiencia(personaID :string, exp :experiencia):Observable<experiencia>{
    return this.http.post<experiencia>(`${this.apiServerURL}/experiencia/crearExperiencia/${personaID}`,exp);
  }

  public updateExperiencia(personaID :string, experienciaID :string, exp :experiencia):Observable<experiencia>{
    return this.http.put<experiencia>(`${this.apiServerURL}/experiencia/editarExperiencia/${personaID}/${experienciaID}`,exp);
  }

  public deleteExperiencia(personaID :string, experienciaID :string):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/experiencia/borrarExperiencia/${personaID}/${experienciaID}`);
  }

}
