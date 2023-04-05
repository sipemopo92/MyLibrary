import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

export interface Jwt {
  access_token: string,
  token_type: string,
  expires_in: number,
  name: string,
  lastname: string,
  email: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authUrl = 'http://127.0.0.1:8000/api/auth'
  private isUserLogged = false;


  constructor(
    private httpclient: HttpClient
  ) { }


  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }


  login(email: string, password: string) {
    return this.httpclient.post(this.authUrl + '/login', { email: email, password: password });
  }


  register(name: string, lastname: string, email: string, password: string) {
    return this.httpclient.post(this.authUrl + '/register', { name: name, lastname: lastname, email: email, password: password });
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isUserLogged = false;
  }


  getUser(): User {
    let data = [];
    if (localStorage.getItem('user')) data = JSON.parse(localStorage.getItem('user')!);
    let user = new User();
    if (data) {
      user.id = data['id'];
      user.name = data['name'];
      user.lastname = data['lastname'];
      user.email = data['email'];
    }
    return user;
  }


  getToken() {
    return localStorage.getItem('token');
  }

  
}
