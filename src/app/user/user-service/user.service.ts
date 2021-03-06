import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ServerService } from '../../shared-services/server.service';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthRequestObject } from '../../models/authRequestObject';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:8080';
  private userIdentity: Account | null = null;
  // private authenticationState = new ReplaySubject<Account | null>(1);

  constructor(private server: ServerService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getUserByUsername(username: string): Observable<any> {
    let route = '/users/' + username;
    return this.server.request('GET', route)
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
            console.log(errorMsg);
          } else {
            errorMsg = this.getServerErrorMessage(error);
            console.log(errorMsg);
          }

          return throwError(this.getServerErrorMessage(error));
        })
      );
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
      console.log(error);
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
