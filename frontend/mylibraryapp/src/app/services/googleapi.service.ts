import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseGoogleapiBooks } from '../models/response-api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleapiService {


  private apiUrl = 'http://127.0.0.1:8000/api/googleapi';


  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }


  searchBooks(title: string) {
    return this.httpClient.get<ResponseGoogleapiBooks>(this.apiUrl + '/?title=' + title, { headers: this.getAuthHeader() });
  }


  getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.getToken() });
    return headers;
  }
  
}
