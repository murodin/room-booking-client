import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  selectedUser: User;
  action: string;

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
      const action = params['action'];
      if(id) {
        this.selectedUser = this.users.find(user => user.id === +id);
        this.action = action;
      }
    });
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id, action: 'view'}});
  }

}
