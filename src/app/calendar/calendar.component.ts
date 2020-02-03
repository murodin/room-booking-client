import { Component, OnInit } from '@angular/core';
import {Booking} from '../model/Booking';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {query} from '@angular/animations';
import {User} from '../model/User';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  bookings: Array<Booking>;
  selectedDate: string;
  dataLoaded = false;

  message = '';

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  loadData() {
    this.message = 'Loading...';
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate) {
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next => {
            this.bookings = next;
            this.dataLoaded = true;
            this.message = '';
          }, error => this.message = 'Sorry sth went wrong'
        );
      }
    );
  }

  ngOnInit() {
   this.loadData();
  }

  editBooking(id: number) {
    //this.router.navigate(['editBooking'], {queryParams: {id}});
    this.router.navigate(['editBookingLoad'], {queryParams: {id}});
  }

  addBooking() {
    //this.router.navigate(['addBooking']);
    this.router.navigate(['editBookingLoad']);
  }

  deleteBooking(id: number) {
    this.message = 'Deleting...';
    this.dataService.deleteBooking(id).subscribe(
      next => {
        this.message = '';
        this.loadData();
      },
      error => {
        this.message = 'sth.went wrong!!';
      }
    );
  }

  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}});
  }

}
