import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiBaseURL :string = 'https://portfolio-cesarodrullan.herokuapp.com';

  private apiServerURL = this.apiBaseURL;

  constructor(private http :HttpClient) {}

  
  public getProyecto(personaID :string, proyectoID :string) :Observable<proyecto>{
    return this.http.get<proyecto>(`${this.apiServerURL}/proyecto/buscarProyecto/${personaID}/${proyectoID}`);
  }
  
  public allProyecto(idPersona :string):Observable<proyecto[]>{
    return this.http.get<proyecto[]>(`${this.apiServerURL}/proyecto/verProyectos/${idPersona}`);
  }

  public addProyecto(personaID :string, pro :proyecto):Observable<proyecto>{
    return this.http.post<proyecto>(`${this.apiServerURL}/proyecto/crearProyecto/${personaID}`,pro);
  }

  public updateProyecto(personaID :string, proyectoID :string, pro :proyecto):Observable<proyecto>{
    return this.http.put<proyecto>(`${this.apiServerURL}/proyecto/editarProyecto/${personaID}/${proyectoID}`,pro);
  }

  public deleteProyecto(personaID :string, proyectoID :string):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/proyecto/borrarProyecto/${personaID}/${proyectoID}`);
  }
}
