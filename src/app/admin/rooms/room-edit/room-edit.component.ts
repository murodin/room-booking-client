import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Layout, LayoutCapacity, Room} from '../../../model/Room';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {

  @Input()
  room: Room;

  @Output()
  dataChangedevent = new EventEmitter();

  message = '';

  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  /*roomForm = new FormGroup(
    {
      roomName: new FormControl('roomName'),
      location: new FormControl('location')
    }
  );*/

  roomForm: FormGroup;

  resetFormEventSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit() {
    this.initializeForm();
    this.resetFormEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy() {
    this.resetFormEventSubscription.unsubscribe();
  }

  initializeForm() {
    this.roomForm =  this.formBuilder.group(
      {
        roomName: [this.room.name, Validators.required],
        location: [this.room.location, [Validators.required, Validators.minLength(2)]]
      }
    );

    /*this.roomForm.patchValue({
      roomName: this.room.name,
      location: this.room.location
    });*/

    for (const layout of this.layouts) {
      const layoutCap = this.room.capacities.find(lc => lc.layout === Layout[layout]);
      const initCap =  layoutCap == null ?  0 : layoutCap.capacity;
      //this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`));
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initCap));
    }
  }

  onSubmit() {
    this.message = 'Saving...';
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];
    this.room.capacities = new Array<LayoutCapacity>();

    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }

    if (this.room.id == null) {
      this.dataService.addRoom(this.room).subscribe(
        next => {
          this.dataChangedevent.emit();
          this.router.navigate(['admin', 'rooms'], {queryParams: {actions: 'view', id: next.id}});
        },
        (error) => this.message = 'Sth wrong...'
      );
    } else {
      this.dataService.updateRoom(this.room).subscribe(
        next => {
          this.dataChangedevent.emit();
          this.router.navigate(['admin', 'rooms'], {queryParams: {actions: 'view', id: next.id}});
        },
        (error) => this.message = 'Sth wrong...'
      );
    }
  }




}
