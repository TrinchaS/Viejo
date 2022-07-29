import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiBaseURL :string = 'https://portfolio-cesarodrullan.herokuapp.com';
  
  private apiServerURL = this.apiBaseURL;

  constructor(private http :HttpClient) {}

  public getEducacion(personaID :string, educacionID :string) :Observable<educacion>{
    return this.http.get<educacion>(`${this.apiServerURL}/educacion/buscarEducacion/${personaID}/${educacionID}`);
  }

  public allEducacion(idPersona: string):Observable<educacion[]>{
    return this.http.get<educacion[]>(`${this.apiServerURL}/educacion/verEducaciones/${idPersona}`);
  }

  public addEducacion(idPersona: string, edu :educacion):Observable<educacion>{
    return this.http.post<educacion>(`${this.apiServerURL}/educacion/crearEducacion/${idPersona}`,edu);
  }

  public updateEducacion(personaID :string, educacionID :string, edu :educacion):Observable<educacion>{
    return this.http.put<educacion>(`${this.apiServerURL}/educacion/editarEducacion/${personaID}/${educacionID}`,edu);
  }

  public deleteEducacion(personaID :string, educacionID :string):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/educacion/borrarEducacion/${personaID}/${educacionID}`);
  }
}
