import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../shared-services/server.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string;
  email: string;

  constructor(private server: ServerService) { }

  ngOnInit(): void {
    this.server.request('GET', '/user').subscribe((user: any) => {
      if(user) {
        this.username = user.username;
        this.email = user.email;
      }
    });
  }

}
