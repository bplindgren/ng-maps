import { Component } from '@angular/core';
import { AuthService } from './shared-services/auth.service';
import { ServerService } from './shared-services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-maps';

  constructor(private authService: AuthService, private serverService: ServerService) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }

}
