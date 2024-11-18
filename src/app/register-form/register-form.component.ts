import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { GeographicLocation } from '../models/geographicLocation';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AxiosService } from '../axios.service';
import { User } from '../models/user';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private axiosService: AxiosService,
              private eventService: EventService) { };

  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";
  geographicLocation: GeographicLocation;

  onLoginTab(): void {
		this.router.navigate(['/login']);
	}

  onSubmitRegister(): void {
    this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: this.firstName,
		        lastName: this.lastName,
		        login: this.login,
		        password: this.password,
            location: this.geographicLocation
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
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
            this.router.navigate(['/welcome']);
		    }
		);
  }

  setGeographicLocationProperties(input: string): void {
    let lng: number = Number(input.substring(input.indexOf("lng") + 6, input.length - 2));
    let lat: number = Number(input.substring(input.indexOf("lat") + 6, input.indexOf(",")));
    let loc: GeographicLocation = {
      x: lng,
      y: lat
    }
    this.geographicLocation = loc;
  }

}
