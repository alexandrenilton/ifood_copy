import { MEAT_API } from '../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class LoginService {
  constructor(private Http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.Http
      .post<User>(`${MEAT_API}/login`, { email: email, password: password });
  }
}
