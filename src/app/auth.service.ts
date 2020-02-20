import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authResultEvent = new EventEmitter<boolean>();
  role: string;
  roleSetEvent = new EventEmitter<string>();

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
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
      next => {
        this.role = next.role;
      }
    );
  }

  checkIfAlreadyAuthenticated() {
    this.dataService.getRole().subscribe(
      next => {
        if (next.role !== '') {
          this.role = next.role;
          this.roleSetEvent.emit(next.role);
          this.isAuthenticated = true;
          this.authResultEvent.emit(true);
        }
      }
    );
  }
}
