import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../models/user';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

  constructor(private router: Router,
              private route: ActivatedRoute) { };

  @Input() user: User;
  displayProfileButton: Boolean = false;
  displayTripButton: Boolean = true;

  loginClick(): void {
    this.router.navigate(['/login']);
  }

  viewProfile(): void {
    this.displayProfileButton = false;
    this.displayTripButton = true;
    let data: NavigationExtras = {
      state: this.user
    }
    this.router.navigate(['user-profile', this.user.id], data)
  }

  registerClick(): void {
    this.router.navigate(['/register']);
  }

  createTripClick(): void {
    this.displayProfileButton = true;
    this.displayTripButton = false;
    this.router.navigate(['/create-trip']);
  }

  logoutClick(): void {
    this.user = null;
    this.router.navigate(['/logout']);
  }
}
