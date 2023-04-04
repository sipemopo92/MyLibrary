import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IGoogleapiBook } from 'src/app/models/googleapi-book';
import { GoogleapiService } from 'src/app/services/googleapi.service';
import { InfobookDialogComponent } from './infobook-dialog/infobook-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.scss']
})
export class GetBooksComponent {


  title = '';
  googleapiBooks: IGoogleapiBook[] = [];
  displayedColumns = ['info', 'title', 'authors', 'isbn', 'google_id', 'save'];


  constructor(
    private googleapiService: GoogleapiService,
    private matDialog: MatDialog, 
    private matSnackBar: MatSnackBar
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
    let dialogRef = this.matDialog.open(InfobookDialogComponent, {
      disableClose: true,
      data: book
    });
  }


  import(book: IGoogleapiBook) {
    this.matSnackBar.open('Saved', '',
      {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 2000,
        panelClass: ['text-center']
      }
    );
  }



}
