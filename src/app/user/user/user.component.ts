import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { ServerService } from '../../shared-services/server.service';
import { AuthService } from '../../shared-services/auth.service';

import { User } from '../../models/user';
import { Coordinate } from '../../models/interfaces/coordinate';
import { Point } from '../../models/interfaces/point';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  user: User;
  isEditing: Boolean = false;
  hasSubmittedAttempt: Boolean = false;
  map: google.maps.Map;
  marker: google.maps.Marker;
  lat: number;
  lng: number;

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

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
        console.log(user);
        this.user = user;
        if (user.location) {
          this.lng = user.location.coordinates[0];
          this.lat = user.location.coordinates[1];
        }
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      let coordinates;
      if (this.user.location) {
        coordinates = {lat: this.lat, lng: this.lng};
      }

      let mapOptions: google.maps.MapOptions = {
        center: coordinates || {lat: -82, lng: 30},
        zoom: 8,
        streetViewControl: false,
        disableDoubleClickZoom: true
      };

      this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

      this.marker = new google.maps.Marker({
        position: {lat: -82, lng: 30},
        map: this.map,
      });

      this.map.addListener("click", ($event) => {
        if(this.isEditing) {
          this.marker.setPosition($event.latLng);
        } else {
          alert("Click edit to change your location!")
        }
      });
    }, 500);
  }

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
    this.marker.setPosition({lat: this.lat, lng: this.lng});
    this.endEditSession();
  }

  endEditSession() {
    this.isEditing = false;
    this.form.disable();
    this.hasSubmittedAttempt = false;
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
        coordinates: [this.marker.getPosition().lng(), this.marker.getPosition().lat()]
      }
    };

    const request = this.server.request('PUT', '/users', data).subscribe((res) => {
      console.log(res);
      this.endEditSession();
    });
  };

}
