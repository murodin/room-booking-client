import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room} from '../../../model/Room';
import {Router} from '@angular/router';
import {DataService} from '../../../data.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room: Room;

  @Output()
  dataChangedEvent = new EventEmitter();

  message = '';

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
  }

  editRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'edit', id: this.room.id}});
  }

  deleteRoom() {
    this.message = 'Deleting...';
    this.dataService.deleteRoom(this.room.id).subscribe(
      next => {
        this.dataChangedEvent.emit();
        this.router.navigate(['admin', 'rooms'])
      }, error => {
        this.message = 'Sorry this room can not be deleted.';
      }
    );
  }

}
