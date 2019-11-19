import { LoginService } from './login/login.service';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) { }

  checkAuthentication(path: string): boolean {
    const loggedIn: boolean = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }
    return loggedIn
  }

  /* configuração da rota */
  canLoad(route: Route): boolean {
    // console.log(route);
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }
}
