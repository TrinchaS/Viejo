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

  public getExperiencia(id :string) :Observable<experiencia>{
    return this.http.get<experiencia>(`${this.apiServerURL}/experiencia/buscaExperiencia/${id}`);
  }

  public allExperiencia():Observable<experiencia[]>{
    return this.http.get<experiencia[]>(`${this.apiServerURL}/experiencia/verExperiencias`);
  }

  public addExperiencia(exp :experiencia):Observable<experiencia>{
    return this.http.post<experiencia>(`${this.apiServerURL}/experiencia/creaExperiencia/`,exp);
  }

  public updateExperiencia(exp :experiencia):Observable<experiencia>{
    return this.http.put<experiencia>(`${this.apiServerURL}/experiencia/editaExperiencia/`,exp);
  }

  public deleteExperiencia(id :number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/experiencia/borrarExperiencia/${id}`);
  }

}
