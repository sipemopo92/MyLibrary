import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IGoogleapiBook } from '../models/googleapi-book';
import { ResponseBook, ResponseBooks } from '../models/response-api';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  private apiUrl = 'http://127.0.0.1:8000/api/books'


  constructor(
    private httpClient: HttpClient, 
    private authService: AuthService
  ) { }


  storeBook(user_id: number, book: IGoogleapiBook) {
    let body = {
      'google_id': book.google_id,
      'title': book.title,
      'authors': book.authors,
      'description': book.description,
      'isbn': book.isbn,
      'thumbnail': book.thumbnail
    };
    return this.httpClient.post<ResponseBook>(this.apiUrl + '/' + user_id, body);
  }


  getBooksByUserId(user_id: number) {
    return this.httpClient.get<ResponseBooks>(this.apiUrl + '/' + user_id);
  }


  removeBook(user_id: number, book_id: number) {
      return this.httpClient.delete<ResponseBook>(this.apiUrl + '/' + user_id + '/' + book_id);
  }


  updateReadCount(user_id: number, book_id: number, read_count: number) {
    let body = {
      'user_id': user_id,
      'book_id': book_id,
      'read_count': read_count,
    };
    return this.httpClient.patch<ResponseBook>(this.apiUrl + '/updateReadCount', body)
  }

}

