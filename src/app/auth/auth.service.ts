import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthModel, AuthResponseBackend } from './models/user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private clientID = "sb-na-979d7117-f6cf-436f-b1b6-e29a102bd5d1!i2141"
  // private clientsecret="T/kd87uzEDSHzyVTIeXviQY7R1Y="
  // private  proxyurl = "https://cors-anywhere.herokuapp.com/";
  // authUrl="https://aji26ufcs.trial-accounts.ondemand.com/oauth2/token"
  // baseUrl="https://spring-security-hybrid-usage-00-00.cfapps.us10-001.hana.ondemand.com"
  
  private authUrl =  "https://express-proxy-app.cfapps.ap21.hana.ondemand.com/auth";
  baseUrl="https://express-proxy-app.cfapps.ap21.hana.ondemand.com/api"
  private clientID="623a6227-8cde-424a-9d03-ee5fe8f6baba"
  private clientsecret="3YOtFRjTzaeWSzTV6/_Ud2GD6OxrYZcD-"
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
      .post<AuthResponseBackend>(`${this.authUrl}`,data.toString(),{ headers })
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

  signUp(value: string, familyName: string, givenName: string, userName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = {
      'value': value,
      'familyName': familyName,
      'givenName': givenName,
      'userName': userName
    }
    const config = {
      maxBodyLength: Infinity,
      headers,
      body: JSON.stringify(data)
    };
    console.log(data)
   return this.http
      .post<any>(
        `${this.baseUrl}/iasusers`,
        data, { headers:headers }
      )

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

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
