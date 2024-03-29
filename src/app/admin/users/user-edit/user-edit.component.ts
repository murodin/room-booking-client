import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  @Input()
  user: User;

  @Output()
  dataChangeEvent = new EventEmitter();

  formUser: User;

  message: string;

  password: string;
  password2: string;

  nameIsValid = false;
  passwordsValid = false;
  passwordsMatch = false;

  userResetSubscription: Subscription;

  constructor(private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit() {
    this.initializeForm();
    this.userResetSubscription = this.formResetService.resetUserFormEvnet.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy() {
    this.userResetSubscription.unsubscribe();
  }

  initializeForm() {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameValid();
    this.checkIfPasswordsAreValid();
  }

  onSubmit() {
    this.message = 'Saving...';
    if(this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.dataChangeEvent.emit();
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.dataChangeEvent.emit();
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        },
        (error) => this.message = 'sth. wrong and the data wasn\'t saved...'
      );
    }
  }

  checkIfNameValid() {
    if (this.formUser.name ) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordsAreValid() {
    if (this.formUser.id != null) {
      this.passwordsValid = true;
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if (this.password) {
        this.passwordsValid = this.password.trim().length > 0;
      } else {
        this.passwordsValid = false;
      }
    }
  }

}
