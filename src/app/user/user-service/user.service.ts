import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthRequestObject } from '../../models/authRequestObject';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:8080';
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);

  constructor(private http: HttpClient, private router: Router) { }

  // authenticate(user: User): Observable<any> {
  //   const url = `${this.baseURL}` + '/authenticate';
  //   return this.http.get(
  //   )
  // }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }
}
