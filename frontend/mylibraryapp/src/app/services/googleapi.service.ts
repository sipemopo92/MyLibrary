import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseGoogleapiBooks } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class GoogleapiService {


  private apiUrl = 'http://127.0.0.1:8000/api/googleapi';


  constructor(
    private httpClient: HttpClient
  ) { }


  searchBooks(title: string) {
    return this.httpClient.get<ResponseGoogleapiBooks>(this.apiUrl + '/?title=' + title);
  }
}
