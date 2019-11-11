import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

import { User } from './user.model';



@Injectable()
export class LoginService {

  user: User; // para guardar os dados do usuário logado

  constructor(private Http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.Http
      .post<User>(`${MEAT_API}/login`, { email: email, password: password })
      .do(user => this.user = user)
  }

  isLoggedIn(): boolean {
    return this.user !== undefined; // se o usuário for diferente de undefined eh pq tá logado
  }
}
