import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { habilidad } from '../model/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private apiServerURL = environment.apiBaseURL;

  constructor(private http :HttpClient) {}

  public getHabilidad(id :string) :Observable<habilidad>{
    return this.http.get<habilidad>(`${this.apiServerURL}/habilidad/buscaHabilidad/${id}`);
  }

  public allHabilidad():Observable<habilidad[]>{
    return this.http.get<habilidad[]>(`${this.apiServerURL}/habilidad/verHabilidades`);
  }

  public addHabilidad(hab :habilidad):Observable<habilidad>{
    return this.http.post<habilidad>(`${this.apiServerURL}/habilidad/creaHabilidad/`,hab);
  }

  public updateHabilidad(hab :habilidad):Observable<habilidad>{
    return this.http.put<habilidad>(`${this.apiServerURL}/habilidad/editaHabilidad/`,hab);
  }

  public deleteHabilidad(id :number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/habilidad/borrarHabilidad/${id}`);
  }
}
