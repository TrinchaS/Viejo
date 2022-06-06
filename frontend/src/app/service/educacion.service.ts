import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  url = 'http://localhost:8080/';

  constructor(private http :HttpClient) {}

  public getEducacion(id :string) :Observable<educacion>{
    return this.http.get<educacion>(`${this.url}buscaEducacion/${id}`);
  }

  public allEducacion(ids:string[]) :Observable<educacion>[]{
    let rta:Observable<educacion>[] = [];
    for(let i of ids){
      rta.push(this.getEducacion(i));
    }
    return rta;
  }
}
