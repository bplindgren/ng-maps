import { EventEmitter, Component, Output } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { GeographicLocation } from '../models/geographicLocation';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

	active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";
  geographicLocation: GeographicLocation;

	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({"login": this.login, "password": this.password});
  }

  onSubmitRegister(): void {
    this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password, "geographicLocation": this.geographicLocation});
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
