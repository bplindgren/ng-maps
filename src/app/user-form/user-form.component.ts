import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { GeographicLocation } from '../models/geographicLocation';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user : User;
  @Output() onSubmitUserUpdateEvent = new EventEmitter();
  @ViewChild(MapComponent) mapComponentRef: MapComponent;

	isEditing: boolean = true;
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  geographicLocation: GeographicLocation = null;

  ngOnInit(): void {
    this.id = this.user.id;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.login = this.user.login;
    this.geographicLocation = this.user.geographicLocation;
  }

  onSubmitUserUpdate(): void {
    this.onSubmitUserUpdateEvent.emit({"id": this.id, "firstName": this.firstName, "lastName": this.lastName, "login": this.login, "geographicLocation": this.geographicLocation});
  }

}
