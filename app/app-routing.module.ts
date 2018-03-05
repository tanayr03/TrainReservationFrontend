import {LoginComponent} from './login/login.component';
import { LogOutComponent } from './logout/logout.component';
import { MyProfileComponent } from './myProfile/myProfile.component';
import {MyTripComponent} from './myTrip/myTrip.component';
import {NavMenuComponent} from './navmenu/navmenu.component';
import { RegisterComponent } from './register/register.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from './search/search.component';
export const routes: Routes = [
  {
    path: 'navmenu', component: NavMenuComponent, children: [
      {path: 'search', component: SearchComponent, outlet: 'child'},
      {path: 'mytrip', component: MyTripComponent, outlet: 'child'},
      {path: 'myprofile', component: MyProfileComponent, outlet: 'child'},
      
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogOutComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
