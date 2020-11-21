import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  public formSubmitAttempt: boolean;
  public displayError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.username && this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  // convenience getter for easy access to form fields
  getFormControls() {
    return this.form.controls;
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        await this.authService.login(this.form.value)
        setTimeout(() => {
          this.displayError = true;
        }, 2000)
      } catch (err) {
        this.loginInvalid = true;
        this.formSubmitAttempt = true;
      }
    } else {
      this.loginInvalid = true;
      this.formSubmitAttempt = true;
    }
  }

}
