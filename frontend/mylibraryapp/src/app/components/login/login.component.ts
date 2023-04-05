import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  formLogin: FormGroup = new FormGroup({});


  constructor(
    private router: Router,
    private authservice: AuthService,
    private matSnackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.newFormLogin();
  }


  newFormLogin() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }


  login() {
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
    this.authservice.login(email, password).subscribe({
      next: (payload: any) => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('user', JSON.stringify(payload));
        this.router.navigate(['main']);
      },
      error: (error: HttpHeaderResponse) => {
        this.matSnackBar.open('Email or password not correct', '',
            {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              duration: 2000,
              panelClass: ['text-center']
            }
        );
        console.error(error);
      }
    })
  }


  goToRegistration() {
    this.router.navigate(['register']);
  }


}
