import {Itenary} from '../models/itenary';
import { Search } from '../models/search';
import { User } from '../models/user';
import {ConfigService} from './config.service';
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';


@Injectable()
export class DataService {
  _baseUrl: string;
  _token: string;
  _headers: Headers;

  constructor(private http: Http,
    private configService: ConfigService) {
    this._baseUrl = configService.getApiURI();
  }
  setHeader() {
    this._headers = new Headers({'Content-Type': 'application/json'});
    this._headers.append('Authorization', 'Bearer ' + this._token);
  }
  search(search: Search): Observable<Itenary[]> {
    this.setHeader();
    return this.http.post(this._baseUrl + 'getTrains/', JSON.stringify(search), {
      headers: this._headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
  }
 getBookings(user: User): Observable<Itenary[]> {
    this.setHeader();
    return this.http.post(this._baseUrl + 'getBookings/', JSON.stringify(user), {
      headers: this._headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
  }

    saveBooking(itenary: Itenary): Observable<void> {
    this.setHeader();
    return this.http.post(this._baseUrl + 'bookTicket/', JSON.stringify(itenary), {
      headers: this._headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
  }
  
   cancelBooking(itenary: Itenary): Observable<void> {
    this.setHeader();
    return this.http.post(this._baseUrl + 'cancelTicket/', JSON.stringify(itenary), {
      headers: this._headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
  }
  saveUser(user: User): Observable<void> {
    this.setHeader();
    return this.http.post(this._baseUrl + 'registerUser/', JSON.stringify(user), {
      headers: this._headers
        })
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
  }
   getUser(user: User): Observable<User> {
    this.setHeader();
    return this.http.post(this._baseUrl + 'loginUser/', JSON.stringify(user), {
      headers: this._headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
  }
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    const serverError = error.json();
    let modelStateErrors = '';
    if (!serverError.type) {
      console.log(serverError);
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}
