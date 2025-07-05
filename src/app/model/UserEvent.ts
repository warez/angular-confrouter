import {UserData} from "./user-data";

export class UserEvent {
  type: 'LOGIN' | 'LOGOUT';
  currentData: UserData | null;

  constructor(type: "LOGIN" | "LOGOUT", currentData: UserData | null) {
    this.type = type;
    this.currentData = currentData;
  }
}
