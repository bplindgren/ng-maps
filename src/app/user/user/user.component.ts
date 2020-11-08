import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { ServerService } from '../../shared-services/server.service';
import { AuthService } from '../../shared-services/auth.service';

import { User } from '../../models/user';
import { Coordinate } from '../../models/interfaces/coordinate';
import { Point } from '../../models/interfaces/point';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  user: User;
  @Output() isEditing: boolean = false;
  hasSubmittedAttempt: boolean = false;
  @Output() lat: number;
  @Output() lng: number;
  zoom: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private server: ServerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserByUsername(localStorage.username).subscribe((user: any) => {
      if (user) {
        // process user, set lng & lat
        console.log(user);
        this.user = user;
        if (user.location) {
          this.lng = user.location.coordinates[0];
          this.lat = user.location.coordinates[1];
          this.zoom = 6;
        } else {
          this.lng = -98;
          this.lat = 39;
          this.zoom = 3;
        }

        //set up form
        this.form = this.formBuilder.group({
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          username: [user.username, Validators.required],
          email: [user.email, { validators: Validators.compose([Validators.required, Validators.email]), updateOn: 'blur' }]
        });
      }
      this.form.disable();
    }), (err) => {
      console.log(err);
    };
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }

  startEditSession() {
    this.isEditing = true;
    this.form.enable();
    this.form.controls.username.disable();
  }

  cancelEditSession() {
    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      email: this.user.email
    });
    this.lng = this.user.location.coordinates[0];
    this.lat = this.user.location.coordinates[1];
    this.endEditSession();
  }

  endEditSession() {
    this.isEditing = false;
    this.form.disable();
    this.hasSubmittedAttempt = false;
  }

  updateLocation(coord: any) {
    this.lat = coord.lat();
    this.lng = coord.lng();
  }

  onSubmit() {
    if(this.form.invalid) {
      this.hasSubmittedAttempt = true;
      return;
    }

    this.hasSubmittedAttempt = false;

    let data = {
      id: this.user.id,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      location: {
        type: "Point",
        coordinates: [this.lng, this.lat]
      }
    };

    const request = this.server.request('PUT', '/users', data).subscribe((res) => {
      console.log(res);
      this.endEditSession();
    });
  };

}
