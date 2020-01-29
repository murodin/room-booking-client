import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Room} from '../../model/Room';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;

  action: string;
  loadingData = true;
  message = 'Please waiting for getting data';

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit() {
     this.dataService.getRooms().subscribe(
       (next) => {
         this.rooms = next;
         this.loadingData = false;
       },
       (error) => {
         this.message = 'Sorry sth went wrong try again!';
       }
      );

    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = null;
        if(id) {
          this.selectedRoom = this.rooms.find(room => room.id === +id); // '4' for string to integer
          this.action = params['action'];
        }
        if(params['action'] === 'add') {
          this.selectedRoom =  new Room();
          this.action = 'edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    );
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams: { id, action: 'view'}}); // same as queryParams: { id: id }
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams: { action: 'add'}});
  }

}
