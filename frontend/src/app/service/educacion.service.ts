import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
  private apiServerURL = environment.apiBaseURL;

  constructor(private http :HttpClient) {}

  public getEducacion(id :string) :Observable<educacion>{
    return this.http.get<educacion>(`${this.apiServerURL}/educacion/buscaEducacion/${id}`);
  }

  public allEducacion():Observable<educacion[]>{
    return this.http.get<educacion[]>(`${this.apiServerURL}/educacion/verEducaciones`);
  }

  public addEducacion(edu :educacion):Observable<educacion>{
    return this.http.post<educacion>(`${this.apiServerURL}/educacion/creaEducacion/`,edu);
  }

  public updateEducacion(edu :educacion):Observable<educacion>{
    return this.http.put<educacion>(`${this.apiServerURL}/educacion/editaEducacion/`,edu);
  }

  public deleteEducacion(id :number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/educacion/borrarEducacion/${id}`);
  }
}
