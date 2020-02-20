import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  selectedUser: User;
  action: string;
  message = 'Loading data... please wait';
  loadingData = true;
  isAdminUser = false;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private formResetservice: FormResetService,
              private authService: AuthService) { }

  loadData() {
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        this.message = 'Error occured... Please contact the support!!!'
      }
    );
  }

  processUrlParams() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.action = params['action'];
      if (id) {
        this.selectedUser = this.users.find(user => user.id === +id);
      }
    });
  }

  ngOnInit() {
    this.loadData();
    if (this.authService.role === 'ADMIN') {
      this.isAdminUser = true;
    }
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams: {id, action: 'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'add'}});
    this.formResetservice.resetUserFormEvnet.emit(this.selectedUser);
  }

}
