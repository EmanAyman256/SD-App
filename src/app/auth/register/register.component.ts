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
          honorprefix: ['', Validators.required],
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
      this.authService.signUp(this.f['username'].value, this.f['firstName'].value, this.f['lastName'].value, this.f['email'].value,this.f['honorprefix'].value)
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
}
