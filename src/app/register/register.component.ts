import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../shared-services/server.service';
import { AuthService } from '../shared-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hasSubmittedAttempt: boolean = false;
  source: string = "register";
  isEditing: boolean = false;
  @Output() lng: number = -95;
  @Output() lat: number = 42;

  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', { validators: Validators.compose([Validators.required, Validators.minLength(8)]), updateOn: 'blur' }],
      email: ['', { validators: Validators.compose([Validators.required, Validators.email]), updateOn: 'blur' }],
      password: ['', { validators: Validators.compose([Validators.required, Validators.minLength(8)]), updateOn: 'blur' }]
    });
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  updateLocation(coord: any) {
    this.lng = coord.lng();
    this.lat = coord.lat();
  }

  onSubmit() {
    if(this.form.invalid) {
      this.hasSubmittedAttempt = true;
      return;
    }

    let data = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      location: {
        type: "Point",
        coordinates: [this.lng, this.lat]
      }
    };

    const request = this.server.request('POST', '/users', data).subscribe((res) => {
      this.authService.login({
        username: this.form.get('username').value,
        password: this.form.get('password').value
      });
    })
  }

}
