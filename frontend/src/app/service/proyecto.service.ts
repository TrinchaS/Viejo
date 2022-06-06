import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = "http://localhost:8080/";

  constructor(private http :HttpClient) {}

  public getProyecto(id :string) :Observable<proyecto>{
    return this.http.get<proyecto>(`${this.url}buscaProyecto/${id}`);
  }

  public allProyecto(ids:string[]) :Observable<proyecto>[]{
    let rta:Observable<proyecto>[] = [];
      for(let i of ids){
        rta.push(this.getProyecto(i));
      }
    return rta;
  }

}
