import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiServerURL = environment.apiBaseURL;

  constructor(private http :HttpClient) {}

  public getProyecto(id :string) :Observable<proyecto>{
    return this.http.get<proyecto>(`${this.apiServerURL}/proyecto/buscaProyecto/${id}`);
  }

  public allProyecto():Observable<proyecto[]>{
    return this.http.get<proyecto[]>(`${this.apiServerURL}/proyecto/verProyectos`);
  }

  public addProyecto(pro :proyecto):Observable<proyecto>{
    return this.http.post<proyecto>(`${this.apiServerURL}/proyecto/creaProyecto/`,pro);
  }

  public updateProyecto(pro :proyecto):Observable<proyecto>{
    return this.http.put<proyecto>(`${this.apiServerURL}/proyecto/editaProyecto/`,pro);
  }

  public deleteProyecto(id :number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/proyecto/borrarProyecto/${id}`);
  }
}
