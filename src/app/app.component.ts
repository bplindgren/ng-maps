import { Component } from '@angular/core';
import { AuthService } from './shared-services/auth.service';
import { UserService } from './user/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-maps';

  constructor(private authService: AuthService, private userService: UserService) { }

  isAuthenticated(): boolean {
    return localStorage.hasOwnProperty('token');
  }

  onLogout() {
    this.authService.logout();
  }

}
