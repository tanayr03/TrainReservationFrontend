import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { SearchComponent } from '././search/search.component';
import { MyTripComponent } from '././myTrip/myTrip.component';
import { NavMenuComponent } from '././navmenu/navmenu.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './logout/logout.component';
import { MyProfileComponent } from './myProfile/myProfile.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './services/authService';


import { DataService } from './services/data.service';
import { ConfigService } from './services/config.service';
import {MessageService,} from 'primeng/components/common/messageservice';
import { ItemsService } from './services/item.service';



import { DataTableModule, SharedModule, DialogModule, TabViewModule, CheckboxModule, RadioButtonModule, DropdownModule, CalendarModule, MessagesModule, MessageModule, GrowlModule,ConfirmDialogModule,ConfirmationService } from 'primeng/primeng';


@NgModule({
  declarations: [
    NavMenuComponent,
    SearchComponent,
    MyTripComponent,
    MyProfileComponent,
    LoginComponent,
    RegisterComponent,
    LogOutComponent,
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
     DropdownModule,
     DataTableModule,
     CheckboxModule,
     DialogModule,
     RadioButtonModule,
     FormsModule,
     CalendarModule,
     ConfirmDialogModule,
     MessagesModule,
     MessageModule,
     GrowlModule,
       HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    ConfigService,
    MessageService,
    ConfirmationService,
    AuthenticationService,
    ItemsService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
