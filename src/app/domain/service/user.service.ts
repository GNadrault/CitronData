import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  client = false;
  private clientSouce = new BehaviorSubject<Boolean>(this.client);
  currentUser = this.clientSouce.asObservable();

  constructor() { }

  setUserClient(value: boolean) {
    this.clientSouce.next(value);
  }
}
