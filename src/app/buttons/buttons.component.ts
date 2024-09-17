import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

	@Output() loginEvent = new EventEmitter();
	@Output() logoutEvent = new EventEmitter();
  @Input() user: User;

}
