import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reseravation } from '../models/reseravation';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
 reservationForm: any;

 constructor(
  private formBuilder:FormBuilder,
  private reservationService: ReservationService,
  private router: Router,
  private activatedRoute: ActivatedRoute
  ){

 }

 ngOnInit():void {
  this.reservationForm = this.formBuilder.group({
    checkInDate:['',Validators.required],
    checkOutDate: ['', Validators.required],
    guestName: ['',Validators.required],
    guestEmail: ['', [Validators.required, Validators.email]],
    roomNumber: ['', Validators.required]
  })

  let id = this.activatedRoute.snapshot.paramMap.get('id');
  
  if(id){
    let reservation: Reseravation | undefined= this.reservationService.getReservation(id);
    if(reservation){
      this.reservationForm.patchValue(reservation);
    }
  }
 }


 onSubmit(): void{
  if(this.reservationForm.valid){
    let reservation: Reseravation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation)
      } else {
        // New
        this.reservationService.addReservation(reservation)   

      }
    this.router.navigate(['/list']);
  }
 }
}
