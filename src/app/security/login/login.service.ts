import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap, switchMap, filter } from 'rxjs/operators';

import { User } from './user.model';
import { Router, NavigationEnd } from '@angular/router';



@Injectable()
export class LoginService {

  user: User; // para guardar os dados do usuário logado

  lastUrl: string; // para guardar a ultima url, em caso de login, para o app redirecionar para a ultima url

  constructor(private Http: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  login(email: string, password: string): Observable<User> {
    return this.Http
      .post<User>(`${MEAT_API}/login`, { email: email, password: password })
      .pipe(
        tap(user => this.user = user)
      );
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
