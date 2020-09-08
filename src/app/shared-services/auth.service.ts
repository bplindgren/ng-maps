import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user) {
    if(user.username !== '' && user.password !== '') {
      return this.server.request('POST', '/authenticate', {
        username: user.username,
        password: user.password
      }).subscribe((response: any) => {
        if(response && response.token !== undefined) {
          this.token = response.token;
          this.server.setLoggedIn(true, this.token);
          this.loggedIn.next(true);
          const userData = { token: this.token };
          localStorage.setItem('username', user.username);
          localStorage.setItem('token', userData.token);
          this.router.navigate(['/user']);
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
