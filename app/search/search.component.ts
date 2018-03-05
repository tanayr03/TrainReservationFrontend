import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {Itenary} from '../models/itenary';
import {Train} from '../models/train';
import {Search} from '../models/search';
import {User} from '../models/user';
import {DataService} from '../services/data.service';
import {ItemsService} from '../services/item.service';
import {NotificationService} from '../services/notification.service';
import {Time} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {DropdownModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';


@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})
export class SearchComponent {
  public stations: string[] = new Array();
  public ticketType: string[] = new Array();
  public noOfPassenger: number[] = new Array();
  public noOfConnections: string[] = new Array();
  public search: Search;
  public itenaryList: Itenary[] = new Array();
  public itenaryToBook: Itenary;
  public displayDialog: Boolean = false;
  public user: User;
  isSuccess: String;

  constructor(public dataService: DataService,
    public messageService: MessageService,
    public itemsService: ItemsService) {
    this.stations = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.ticketType = ['Any', 'Regular', 'Express'];
    this.noOfPassenger = [1, 2, 3, 4, 5];
    this.noOfConnections = ['Any', 'None', 'One'];
    this.search = new Search();
    this.search.srcStation = 'A';
    this.search.desStation = 'B';
    this.search.isRoundtrip = 1;
    this.search.ticketType = 'Any';
    this.search.noOfConnections = 'Any';
    this.search.noOfPassenger = 1;
    this.search.departDate = new Date();
    this.search.returnDate = new Date();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.search.noOfConnections='Any';
    this.search.isExactTime=false;
  }
  /*Search() {
     alert(JSON.stringify(this.search));
     this.creteItenaryTemp();
   }  */

  bookTicket(itenary) {
    this.itenaryToBook = itenary;
    this.displayDialog = true;
  }
  hideChildModal() {
    this.displayDialog = false;
  }

  Search() {
    // this.search.date.setHours(this.search.depart.getHours()-8);

    this.dataService.search(this.search).subscribe((itenaryList: Itenary[]) => {
      this.itenaryList = itenaryList;
      if(this.itenaryList.length==0)
      {
       this.messageService.add({severity: 'info', summary: 'No Results Found'});
    }
    });

  }

  save() {
    this.itenaryToBook.email = this.user.email;
    this.dataService.saveBooking(this.itenaryToBook)
      .subscribe(
      data => {
        this.messageService.add({severity: 'success', summary: 'Booking  is confirmed'});
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error  Occurred'});
      });
    this.hideChildModal();
  }

cancel(){
  this.hideChildModal();
}

}
