import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IGoogleapiBook } from 'src/app/models/googleapi-book';
import { GoogleapiService } from 'src/app/services/googleapi.service';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.scss']
})
export class GetBooksComponent {


  title = '';
  googleapiBooks: IGoogleapiBook[] = [];
  displayedColumns = ['title', 'authors', 'isbn', 'google_id', 'info'];


  constructor(
    private googleapiService: GoogleapiService
  ) { }


  searchBooks() {
    if (this.title == '') {
      alert('Insert a title');
      // TODO
    } else {
      this.googleapiService.searchBooks(this.title).subscribe({
        next: (res) => {
          if (res.success) {
            this.googleapiBooks = res.data;
            // console.log(this.googleapiBooks);
          } else {
            alert(res.message);
            console.error(res);
          }
        },
        error: (error: HttpHeaderResponse) => {
          console.error(error);
        }
      })
    }
  }

  showInfo(book: IGoogleapiBook) {
    console.log(book);
  }


}
