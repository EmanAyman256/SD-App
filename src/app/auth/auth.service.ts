import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthModel, AuthResponseBackend } from './models/user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {  

  private authUrl = environment.authUrl;
  baseUrl=environment.apiUrl
  // registerUrl=environment.usersUrl
  private clientID=environment.clientId
  private clientsecret=environment.secretClient

  loggedInUser = new BehaviorSubject<AuthModel | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,private router:Router) {}

  Login(email: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.clientID}:${this.clientsecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const data = new URLSearchParams();
    data.set('grant_type', 'password');
    data.set('username', email);
    data.set('password', password);
    return this.http
      .post<AuthResponseBackend>(`${this.baseUrl}/accounts/login`,data.toString(),{ headers })
      .pipe(
        tap((resData) => {
          const user=new AuthModel(email,resData.id_token);
          console.log('Access Token:', resData.id_token);
          localStorage.setItem('token', resData.id_token);
          this.loggedInUser.next(user);
          return user;

        })
      );
  }

  signUp(userName: string, givenName: string, familyName: string, email: string) {
  
    // const headers=new HttpHeaders({
    //   Authorization: 'Basic ' + btoa(`${this.clientID}:${this.clientsecret}`),
    //   'Content-Type': 'application/json',
    // })
    const data = {
        "userName": userName,
        "givenName": givenName, 
        "familyName": familyName,
        "value": email
    }
   console.log(data)
   return this.http
      .post<any>(`${this.baseUrl}/accounts`,data)

  }
  logout() {
    this.loggedInUser.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}