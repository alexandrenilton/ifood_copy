import { LoginService } from './login/login.service';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepting', request);
    const loginService = this.injector.get(LoginService);
    if (loginService.isLoggedIn()) {
      // adiciona header customizado
      // deve-se clonar pq o request original é imutável
      const authRequest = request.clone(
        { setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } });
      return next.handle(authRequest);
    } else {
      // sempre vai retornar isso, pense num middleware
      return next.handle(request);
    }
  }

}
