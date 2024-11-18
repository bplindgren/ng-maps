import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { GeographicLocation } from '../models/geographicLocation';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;
  @Output() onSubmitUserUpdateEvent = new EventEmitter();

  isEditing: boolean = true;
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  token: string = "";
  geographicLocation: GeographicLocation = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      let u = this.router.getCurrentNavigation()?.extras.state;
      this.id = u['id'];
      this.firstName = u['firstName'];
      this.lastName = u['lastName'];
      this.login = u['login'];
      this.token = u['token'];
      this.geographicLocation = u['location'];
    }
  }

  ngOnInit(): void {
    this.user = new User(
      this.id,
      this.login,
      this.firstName,
      this.lastName,
      this.token,
      this.geographicLocation
    )
  }

  onSubmitUserUpdate(): void {
    this.onSubmitUserUpdateEvent.emit({"id": this.id, "firstName": this.firstName, "lastName": this.lastName, "login": this.login, "geographicLocation": this.geographicLocation});
  }

}
