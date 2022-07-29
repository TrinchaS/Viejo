import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { habilidad } from '../model/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private apiBaseURL :string = 'https://portfolio-cesarodrullan.herokuapp.com';

  private apiServerURL = this.apiBaseURL;

  constructor(private http :HttpClient) {}

  public getHabilidad(personaID :string, habilidadID :string) :Observable<habilidad>{
    return this.http.get<habilidad>(`${this.apiServerURL}/habilidad/buscarHabilidad/${personaID}/${habilidadID}`);
  }

  public allHabilidad(idPersona :string):Observable<habilidad[]>{
    return this.http.get<habilidad[]>(`${this.apiServerURL}/habilidad/verHabilidades/${idPersona}`);
  }

  public addHabilidad(personaID :string, hab :habilidad):Observable<habilidad>{
    return this.http.post<habilidad>(`${this.apiServerURL}/habilidad/crearHabilidad/${personaID}`,hab);
  }

  public updateHabilidad(personaID :string, habilidadID :string, hab :habilidad):Observable<habilidad>{
    return this.http.put<habilidad>(`${this.apiServerURL}/habilidad/editarHabilidad/${personaID}/${habilidadID}`,hab);
  }

  public deleteHabilidad(personaID :string, habilidadID :string):Observable<String>{
    return this.http.delete<String>(`${this.apiServerURL}/habilidad/borrarHabilidad/${personaID}/${habilidadID}`);
  }
}
