export class UserData {
  _preferredName!: string;
  _roles!: string[];

  constructor(
    preferredName: string = '',
    roles: string[] = []) {
    this._preferredName = preferredName;
    this._roles = roles;
  }

  get preferredName(): string {
    return this._preferredName || 'Guest';
  }

  get roles(): string[] {
    return this._roles || [];
  }
}
