import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, throwError } from 'rxjs';
// import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

function equalValue(control:AbstractControl)
{
  const password=control.get('password')?.value;
  const confirmPassword=control.get('rePassword')?.value;
  if(password===confirmPassword)
  { 
    return null;
  }
  return{NorEqualValues:true}
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', [Validators.required]]
      });
  }
  
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.authService.signUp(this.f['email'].value, this.f['lastName'].value, this.f['firstName'].value, this.f['username'].value)
          .pipe(first())
          .subscribe({
              next: (response) => {
                  console.log(response);
                  this.router.navigate(['/login'], { relativeTo: this.route });
                  this.loading = false;
              },
              error: error => {
                  this.loading = false;
              }
          });
     
  }
  // onSubmit()
  // {
  //   const email=this.signupForm.value.email!
  //   const name=this.signupForm.value.name!
  //   const password=this.signupForm.value.passwords?.password!
  //   const rePassword=this.signupForm.value.passwords?.rePassword!
  //   const phone=this.signupForm.value.phone!
  //   this.isLoading=true
  //   this.AuthSrvice.SignUp(name,email,password,rePassword,phone).pipe(
  //     catchError((error:HttpErrorResponse)=>{
  //         this.error=error.message
  //         this.isLoading=false        
  //         return throwError(() => new Error(error.message));
  //     })
  //   ).subscribe(resData=>{
  //     console.log(resData);

  //     if(resData.message==='success')
  //     {
  //       Swal.fire({title:"Great !",text:"You Signed Up Successfully,Login Now",icon:'success'});

  //       this.isLoading=false;
  //       this.router.navigate(['/login'])
  //     }
  //     else{
  //       this.isLoading=false;
  //     }
      
    
  //   // },error=>{
  //   //   // console.log(error.errors.msg);
      
  //   //   error="An Unknown Error Occured !"
  //   //   this.error=error;


  //   });
    
  // }

}
