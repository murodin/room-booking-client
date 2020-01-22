import { Injectable } from '@angular/core';
import {Layout, LayoutCapacity, Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Booking} from './model/Booking';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Array<Room>;
  private users: Array<User>;
  private bookings: Array<Booking>;

  getRooms(): Observable<Array<Room>> {
    return of(this.rooms);
  }

  getUsers(): Observable<Array<User>> {
    return of(this.users);
  }

  updateUser(user: User): Observable<User> {
    const originalUser = this.users.find(u => u.id === user.id);
    originalUser.name = user.name;
    return of(originalUser);
  }

  addUser(newUser: User, password: string): Observable<User> {
    let id = 0;
    for(const user of this.users) {
      if (user.id > id) {
        id = user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);
    return of(newUser);
  }

  deleteUser(id: number): Observable<any> {
    const user = this.users.find(r => r.id === id);
    this.users.splice(this.users.indexOf(user), 1);
    return of(null);
  }

  resetUserPassword(id: number): Observable<any> {
    return of(null);
  }

  updateRoom(room: Room): Observable<Room>{
    const oriRoom = this.rooms.find(r => r.id === room.id);
    oriRoom.name =  room.name;
    oriRoom.location = room.location;
    oriRoom.capacities = room.capacities;
    return of(oriRoom);
  }

  addRoom(newRoom: Room): Observable<Room> {
    let id = 0;
    for (const room of this.rooms) {
      if(room.id > id) {
        id = room.id;
      }
    }

    newRoom.id = id + 1;
    this.rooms.push(newRoom);
    return of(newRoom);
  }

  deleteRoom(id: number): Observable<any> {
    const room = this.rooms.find(r => r.id === id);
    this.rooms.splice(this.rooms.indexOf(room), 1);
    return of(null);
  }

  getBookings(): Observable<Array<Booking>> {
    return of(this.bookings);
  }

  getBooking(id: number): Observable<Booking> {
    return of(this.bookings.find(b => b.id === id));
  }

  saveBooking(booking: Booking): Observable<Booking> {
    const oriBooking = this.bookings.find(b => b.id === booking.id);
    oriBooking.date = booking.date;
    oriBooking.startTime = booking.startTime;
    oriBooking.endTime = booking.endTime;
    oriBooking.user.name = booking.user.name;
    oriBooking.participants = booking.participants;
    oriBooking.title = booking.title;
    oriBooking.layout = booking.layout;
    oriBooking.room = booking.room;
    return of(oriBooking);
  }

  addBooking(newBooking: Booking): Observable<Booking> {
    let id = 0;
    for (const booking of this.bookings) {
      if (id < booking.id) {
         id = booking.id;
      }
    }

    newBooking.id = id + 1;
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  deleteBooking(id: number): Observable<any> {
    const deletedBooking = this.bookings.find(b => b.id === id);
    this.bookings.splice(this.bookings.indexOf(deletedBooking), 1);
    return of(null);
  }

  constructor() {
    this.rooms = new Array<Room>();
    this.users = new Array<User>();

    const room1 = new Room();
    room1.id = 1;
    room1.location = 'First floor';
    room1.name = 'First Room';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.location = 'Third floor';
    room2.name = 'Second Room';

    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;

    room2.capacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);

    const user1 = new User();
    user1.id = 1;
    user1.name = 'Murat';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Saniye';

    const user3 = new User();
    user3.id = 3;
    user3.name = 'Zeynep';

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.room = room1;
    booking1.user = user1;
    booking1.layout = Layout.THEATER;
    booking1.title = 'Example meeting';
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking1.startTime = '11:30';
    booking1.endTime = '12:30';
    booking1.participants = 12;

    const booking2 = new Booking();
    booking2.id = 2;
    booking2.room = room2;
    booking2.user = user2;
    booking2.layout = Layout.USHAPE;
    booking2.title = 'Another meeting';
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-GB');
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';
    booking2.participants = 5;

    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }

}
