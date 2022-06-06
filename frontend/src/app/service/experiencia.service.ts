import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private url = "http://localhost:8080/";

  constructor(private http :HttpClient) {}

  public getExperiencia(id :string) :Observable<experiencia>{
    return this.http.get<experiencia>(`${this.url}buscaExperiencia/${id}`);
  }

  public allExperiencia(ids:string[]) :Observable<experiencia>[]{
    let rta:Observable<experiencia>[] = [];
      for(let i of ids){
        rta.push(this.getExperiencia(i));
      }
    return rta;
  }
}
