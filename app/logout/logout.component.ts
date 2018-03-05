import { Component } from '@angular/core';

@Component({
    selector: 'app-logout',
    templateUrl: 'logout.component.html'
    })
export class LogOutComponent {
  constructor()
  {
    localStorage.removeItem('currentUser');
  }
}
