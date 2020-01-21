import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  selectedDate = new Date();

  constructor() { }

  ngOnInit() {
    const date: string =  formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-UK');
    console.log(date);
  }

}
