import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error!:string
  constructor(private oauthService: OAuthService,private Authservice:AuthService,private router:Router){}
  loginForm=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(6)])});
  isLoading=false;
  isSubmitted=false;

  get emailIsInvalid()
  {
    return(
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    )
  }
  get passwordIsInvalid()
  {
    return(
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    )
  }


  onSubmit()
  {
    const email=this.loginForm.value.email!;
    const password=this.loginForm.value.password!
    
    this.Authservice.Login(email,password).pipe(
      catchError((error:HttpErrorResponse)=>{
          this.error=error.message
          console.log(error);
          
          return throwError(() => new Error(error.message));
      })
    ).subscribe(data=>
    {
      console.log(data);
      console.log("Success Login");
      
      this.router.navigate(['tendering'])
      
    }
    )
  }

}