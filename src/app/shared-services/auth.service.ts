import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerService } from './server.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

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

  login(user) {
    if(user.username !== '' && user.password !== '') {
      return this.server.request('POST', '/authenticate', {
        username: user.username,
        password: user.password
      }).subscribe((response: any) => {
        if(response && response.token !== undefined) {
          this.token = response.token;
          this.loggedIn.next(true);
          const userData = { token: this.token };
          localStorage.setItem('username', user.username);
          localStorage.setItem('token', userData.token);
          this.server.setLoggedIn(true, this.token).subscribe(res => {
            if (res === true) {
              this.router.navigate(['/user']);
            }
          });

        }
      });
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
