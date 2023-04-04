import { Component } from '@angular/core';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.scss']
})
export class GetBooksComponent {


  title = '';



  searchBooks() {
    if (this.title == '') {
      alert('Insert a title');
      // TODO
    } else {
      
    }
  }


}
