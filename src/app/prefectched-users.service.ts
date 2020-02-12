import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './model/User';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PrefectchedUsersService implements Resolve<Observable<Array<User>>> {

  constructor(private dataService: DataService) { }

  resolve(): Observable<Array<User>> {
    return this.dataService.getUsers();
  }
}
