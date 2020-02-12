import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() { }

  authenticate(name: string, password: string): boolean {
    if (name === 'murat' && password === '123') {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
