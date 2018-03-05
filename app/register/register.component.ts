import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {User} from '../models/user';
import {DataService} from '../services/data.service';
import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  public user: User;
  loading = false;

  constructor(
    private router: Router,
    private dataservice: DataService,
    private alertService: MessageService) {
    this.user = new User();
  }

  register() {
    this.loading = true;
   this.dataservice.saveUser(this.user)
      .subscribe(
      data => {
        this.alertService.add({severity: 'success', summary: 'Registration  is successfull'});
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.add({severity: 'error', summary: 'Error  Occurred'});
        this.loading = false;
      }); 
  }
}
