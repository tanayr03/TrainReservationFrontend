import { ConfirmationService } from 'primeng/primeng';;
import { Itenary } from '../models/itenary';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {User} from '../models/user';
import {DataService} from '../services/data.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-mytrip',
  templateUrl: 'myTrip.component.html'
})
export class MyTripComponent {
  public bookings:Itenary[]= new Array();
  public user:User;
  public itenaryToCancel:Itenary;
  constructor(private dataService:DataService,
  private messageService:MessageService,
private confirmationService: ConfirmationService)
  {
     this.user = JSON.parse(localStorage.getItem('currentUser'));
     this.getAllTrips();
  }
  
  getAllTrips()
  {
    this.dataService.getBookings(this.user)
      .subscribe(
      data => {
        this.bookings=data;
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error  Occurred'});
      }); 
  }
  cancelTicket()
  {
   
    this.dataService.cancelBooking(this.itenaryToCancel)
      .subscribe(
      data => {
        this.itenaryToCancel.bookingStatus="cancelled";
        this.updateArray();
        this.messageService.add({severity: 'success', summary: 'Booking  is cancelled'});
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error  Occurred'});
      });
  }
   updateArray() {
        for (let i = 0; i < this.bookings.length; i++) {
            if (this.bookings[i].booking_id == this.itenaryToCancel.booking_id) {
                this.bookings[i] = this.itenaryToCancel;
            }
        }
    }
     confirm1(itenary) {
        this.itenaryToCancel=itenary;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to cancel this booking?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
             this.cancelTicket();
            },
            reject: () => {
            }
        });
    }
}
