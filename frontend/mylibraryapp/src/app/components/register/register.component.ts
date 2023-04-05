import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  
  formRegister: FormGroup = new FormGroup({});


  constructor(
    private router: Router, 
    private authservice: AuthService
  ) { }


  ngOnInit() {
    this.newFormRegister();
  }


  newFormRegister() {
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  get name() { return this.formRegister.get('name'); }
  get lastname() { return this.formRegister.get('lastname'); }
  get email() { return this.formRegister.get('email'); }
  get password() { return this.formRegister.get('password'); }


  register() {
    let name = this.formRegister.value.name;
    let lastname = this.formRegister.value.lastname;
    let email = this.formRegister.value.email;
    let password = this.formRegister.value.password;
    this.authservice.register(name, lastname, email, password).subscribe({
      next: (payload: any) => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('user', JSON.stringify(payload));
        this.router.navigate(['main']);
      },
      error: (error: HttpHeaderResponse) => {
        console.log(error);
      }
    });
  }


  goToLogin() {
    this.router.navigate(['login']);
  }


}
