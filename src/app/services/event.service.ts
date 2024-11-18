import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private loginEvent = new Subject<any>();
  private registerEvent = new Subject<any>();

  emitLoginEvent(data: any) {
    this.loginEvent.next(data);
  }

  emitRegisterEvent(data: any) {
    this.registerEvent.next(data);
  }

  getLoginEvent() {
    return this.loginEvent.asObservable();
  }

  getRegisterEvent() {
    return this.registerEvent.asObservable();
  }
}
