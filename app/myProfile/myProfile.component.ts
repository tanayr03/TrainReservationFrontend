import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { User } from '../models/user';
import { DataService } from '../services/data.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-myprofile',
    templateUrl: 'myProfile.component.html'
    })
export class MyProfileComponent {
  public user:User;
   constructor(
    private dataservice: DataService,
    private alertService: MessageService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }  
}
