import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user-service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  account: Account | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("ngOnInit HomeComponent")
    // this.userService.identity().subscribe(account => this.account = account);
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

}
