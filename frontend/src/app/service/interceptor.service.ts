import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private tokenService: TokenService) { } 


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');

    const toke = this.tokenService.getToken();
    if(toke != null){
      //const headers = new HttpHeaders({'Authorization':,'Bearer'+token});
      const reqClone = req.clone({headers: req.headers.set('Authorization','Bearer'+toke)});
      return next.handle(reqClone);
    }
    return next.handle(req.clone());
  }
}
