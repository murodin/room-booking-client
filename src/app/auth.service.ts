import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authResultEvent = new EventEmitter<boolean>();
  //jwtToken: string;
  role: string;

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        //this.jwtToken = next.result;
        this.setUpRole();
        this.isAuthenticated = true;
        this.authResultEvent.emit(true);
      }, error => {
        this.isAuthenticated = false;
        this.authResultEvent.emit(false);
      }
    );
  }

  setUpRole() {
    this.dataService.getRole().subscribe(
      next => this.role = next.role
    );
  }
}
