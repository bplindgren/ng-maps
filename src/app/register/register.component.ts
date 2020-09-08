import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../shared-services/server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit() {
    if(!this.form.valid) {
      return;
    }

    const request = this.server.request('POST', '/users', {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    });

    request.subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

}
