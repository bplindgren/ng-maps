import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './models/user';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'frontend';
  user: User;

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) {
    this.eventService.getRegisterEvent().subscribe(data => {
      // console.log('App Component Register: Data: ', data);
      this.user = data;
    })

    this.eventService.getLoginEvent().subscribe(data => {
      // console.log('App Component Login: Data: ', data);
      this.user = data;
      this.router.navigate(['user-profile', data.id, data])
    })
  }
}
