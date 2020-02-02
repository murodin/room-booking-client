import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit() {
  }

  editUser() {
    this.router.navigate(['admin', 'users'], {queryParams: {action: 'edit', id: this.user.id}});
  }

  deleteUser() {
    this.message = 'Deleting...';
    this.dataService.deleteUser(this.user.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }, error => {
        this.message = 'Sorry sth happened to delete the user.';
      }
    );
  }

  resetPassword() {
    this.message = 'please wait...';
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next => {
        this.message = 'password reset...';
      }, error => {
        this.message = 'Sorry sth went wrong!!!';
      }
    );
  }

}
