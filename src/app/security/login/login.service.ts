import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { User } from './user.model';
import { Router, NavigationEnd } from '@angular/router';



@Injectable()
export class LoginService {

  user: User; // para guardar os dados do usuário logado

  lastUrl: string; // para guardar a ultima url, em caso de login, para o app redirecionar para a ultima url

  constructor(private Http: HttpClient, private router: Router) {
    this.router.events.filter(e => e instanceof NavigationEnd)
      // .subscribe( (e: NavigationEnd) => console.log(e.url));
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  login(email: string, password: string): Observable<User> {
    return this.Http
      .post<User>(`${MEAT_API}/login`, { email: email, password: password })
      .do(user => this.user = user)
  }

  isLoggedIn(): boolean {
    return this.user !== undefined; // se o usuário for diferente de undefined eh pq tá logado
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

  handleLogout() {
    this.user = undefined;
  }
}
