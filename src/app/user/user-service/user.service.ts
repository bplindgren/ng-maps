import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthRequestObject } from '../../models/authRequestObject';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:8080';
  private userIdentity: Account | null = null;
  // private authenticationState = new ReplaySubject<Account | null>(1);

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getUserByUsername(username: string): Observable<any> {
    const header = (localStorage.token) ? { 'Authorization': `Bearer ${localStorage.token}`, 'Access-Control-Allow-Origin': '*' } : undefined;

    let route = this.baseURL + '/users/' + username;
    return this.http.get(route, {
        responseType: 'json',
        headers: header}
      ).pipe(
          catchError(error => {
              let errorMsg: string;
              if (error.error instanceof ErrorEvent) {
                  errorMsg = `Error: ${error.error.message}`;
                  console.log(errorMsg);
              } else {
                  errorMsg = this.getServerErrorMessage(error);
                  console.log(errorMsg);
              }

              return throwError(errorMsg);
          })
      );
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
      switch (error.status) {
        case 401: {
          this.router.navigate(['/login']);
        }
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }
      }
    }

}
