import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';import { User } from '../models/user';
import { AuthenticationService } from '../services/authService';
import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit{
    public user:User;
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataservice: DataService,
        private messageService: MessageService
      ) { }
 
    ngOnInit() {
        // reset login status
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.user=new User();
    }
 
    login() {
        this.loading = true;
      this.user.firstName="";
            this.dataservice.getUser(this.user).subscribe((user:User) => {
            this.user=user;
            localStorage.setItem('currentUser', JSON.stringify(this.user));   
              this.router.navigate(['/navmenu']);    
        },
            error => {
                this.messageService.add({severity: 'error', summary: 'Error Occurred'}); 
            });
  } 
}