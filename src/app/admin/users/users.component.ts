import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;
  selectedUser: User;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
      });

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.selectedUser = this.users.find(user => user.id === +id);
    });
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id}});
  }

}
