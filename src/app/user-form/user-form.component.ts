import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../models/user'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User;
  @Output() onSubmitUserUpdateEvent = new EventEmitter();

	isEditing: boolean = true;
  id: number = 0;
  firstName: string = "";
  lastName: string = "";
  login: string = "";

  ngOnInit(): void {
    this.id = this.user.id;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.login = this.user.login;
  }

  onSubmitUserUpdate(): void {
    this.onSubmitUserUpdateEvent.emit({"id": this.id, "firstName": this.firstName, "lastName": this.lastName, "login": this.login});
  }

}
