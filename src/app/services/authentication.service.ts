// shared.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registeredUsers: any[] = [];

  constructor() {}

  getRegisteredUsers(): any[] {
    return this.registeredUsers;
  }

  addRegisteredUser(user: any): void {
    this.registeredUsers.push(user);
  }
}
