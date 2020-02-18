import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authResultEvent = new EventEmitter<boolean>();
  //jwtToken: string;

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        //this.jwtToken = next.result;
        this.isAuthenticated = true;
        this.authResultEvent.emit(true);
      }, error => {
        this.isAuthenticated = false;
        this.authResultEvent.emit(false);
      }
    );
  }

  getRole(): string {
    /*if (this.jwtToken == null) return null;
    const encodedPayload = this.jwtToken.split(".")[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;*/
    return 'ADMIN';
  }
}
