import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authResultEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.isAuthenticated = true;
        this.authResultEvent.emit(true);
      }, error => {
        this.isAuthenticated = false;
        this.authResultEvent.emit(false);
      }
    )
  }
}
