import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { habilidad } from '../model/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private url = "http://localhost:8080/";

  constructor(private http :HttpClient) {}

  public getHabilidad(id :string) :Observable<habilidad>{
    return this.http.get<habilidad>(`${this.url}buscaHabilidad/${id}`);
  }

  public allHabilidad(ids:string[]) :Observable<habilidad>[]{
    let rta:Observable<habilidad>[] = [];
      for(let i of ids){
        rta.push(this.getHabilidad(i));
      }
    return rta;
  }
}
