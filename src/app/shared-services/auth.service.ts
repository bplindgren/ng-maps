import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerService } from './server.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  constructor(
    private router: Router,
    private server: ServerService,
    public jwtHelperService: JwtHelperService) {
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }

  async login(user) {
    return await this.server.request('POST', '/authenticate', {
      username: user.username,
      password: user.password
    }).subscribe(
        (res: HttpResponse<any>) => {
          // console.log('HTTP response', res)
          if(res && res !== undefined) {
            this.token = res.body.token;
            this.loggedIn.next(true);
            const userData = { token: this.token };
            localStorage.setItem('username', user.username);
            localStorage.setItem('token', userData.token);
            this.server.setLoggedIn(true, this.token).subscribe(res => {
              if (res === true) {
                this.router.navigate(['/home']);
              }
            });
          }
        },
        err => {
          // console.log('HTTP Error', err)
          return err;
        },
        () => { console.log('HTTP request completed.') }
      )
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
