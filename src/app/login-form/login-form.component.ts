import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AxiosService } from '../axios.service';
import { User } from '../models/user';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private axiosService: AxiosService,
              private eventService: EventService) { };

  login: string = "";
  password: string = "";

	onRegisterTab(): void {
		this.router.navigate(['/register']);
	}

	onSubmitLogin(): void {
		this.axiosService.request(
		    "POST",
		    "/login",
		    {
		        login: this.login,
		        password: this.password
		    }).then(
		    response => {
          let newUser = new User(
              response.data.id,
              response.data.login,
              response.data.firstName,
              response.data.lastName,
              response.data.token,
              response.data.location
          )
          let data: NavigationExtras = {
            state: newUser
          }
          this.eventService.emitRegisterEvent(newUser);
          this.router.navigate(['user-profile', response.data.id], data)
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		    }
		);
	}

}
