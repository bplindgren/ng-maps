import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { ServerService } from '../../shared-services/server.service';
import { AuthService } from '../../shared-services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  user: User;
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private server: ServerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email]
    });
    this.form.disable();
    this.getUser(localStorage.username);
  }

  getUser(username: string): void {
    this.userService.getUserByUsername(username).subscribe((user: any) => {
      if(user) {
        this.user = user;
        this.form.setValue({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email
        })
      }
    }), (err) => {
      console.log(err);
    };
  }

  startEditSession() {
    this.isEditing = true;
    this.form.enable();
  }

  onSubmit() {
    if(!this.form.valid) {
      return;
    }

    this.isEditing = false;
    this.form.disable();

    const request = this.server.request('PUT', '/users', {
      id: this.user.id,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value
    });

    request.subscribe((res) => {
      console.log(res);
    });
  }

}
