import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AlertService } from 'src/app/shared/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

    private router: Router,
    private authService: AuthService,
     private alertService: AlertService,
     private oauthService: OAuthService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(6)]]
    });
  }

  // for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
     // reset alerts on submit
     this.alertService.clear();

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.Login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.oauthService.initImplicitFlow();
          // console.log(this.oauthService.initImplicitFlow());
          this.router.navigate(['/tendering']);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

}