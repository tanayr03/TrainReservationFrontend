import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {User} from '../models/user';
import { DataService } from './data.service';
import { ItemsService } from './item.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  public user: User;
  constructor(public dataService: DataService,
    public messageService: MessageService,
    public itemsService: ItemsService
  ) {
    this.user = new User();
    this.user.email = "tanayr03@gmail.com";
    this.user.firstName = "tanay";
    this.user.password = "tanay123";
  }

  login(email: string, password: string) {
    this.user.email=email;
    this.user.password=password;
   this.dataService.getUser(this.user).subscribe((user:User) => {
     
            this.user=user;
            localStorage.setItem('currentUser', JSON.stringify(this.user));       
        },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error Occurred'}); 
            });
    
   
  } 

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}