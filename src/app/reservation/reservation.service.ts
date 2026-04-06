import { Injectable } from '@angular/core';
import { Reseravation } from '../models/reseravation';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationList: Reseravation[] = [];

  constructor() { 
    let savedReservations = localStorage.getItem('reservations');
    this.reservationList = savedReservations? JSON.parse(savedReservations) : [];
  }

  

  addReservation(reservation:Reseravation): void{
    let id = Date.now().toString();
    reservation.id = id;
    this.reservationList.push(reservation);
    localStorage.setItem('reservations',JSON.stringify(this.reservationList));
  }

  getReservations(): Reseravation[] {
    return this.reservationList;
  }

  getReservation(id:string): Reseravation | undefined {
    let idx = this.reservationList.findIndex(res => res.id === id);
    return this.reservationList.find(res => res.id === id);
  }
  deleteReservation(id:string): void{
    let idx = this.reservationList.findIndex(res => res.id === id);
    this.reservationList.splice(idx,1);
    localStorage.setItem('reservations',JSON.stringify(this.reservationList));
  }
  
  updateReservation(id:string, reservation:Reseravation): void{
    let idx = this.reservationList.findIndex(res => res.id === id);
    this.reservationList[idx] = reservation;
    localStorage.setItem('reservations',JSON.stringify(this.reservationList));
  }
}
