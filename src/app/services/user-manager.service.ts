import {Injectable} from '@angular/core';
import {UserData} from "../model/user-data";
import {Subject, Subscription} from "rxjs";
import {UserEvent} from "../model/UserEvent";

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private userData: UserData | null = new UserData("testUser", []);

  private onUserEventSubject = new Subject<UserEvent>();

  constructor() {

  }

  public get authenticated(): boolean {
    return this.userData != undefined;
  }

  public onUserEvent(onNext: (arg: UserEvent)=>void): Subscription {
    return this.onUserEventSubject.subscribe(onNext);
  }

  public login(data: any): void {
    this.userData = data;
    this.onUserEventSubject.next(new UserEvent("LOGIN", this.userData));
  }

  public get user(): UserData | null{
    return this.userData;
  }

  public logout(): void {

    this.userData = null;
    this.onUserEventSubject.next(new UserEvent("LOGOUT", null));

    window.location.reload();
  }
}
