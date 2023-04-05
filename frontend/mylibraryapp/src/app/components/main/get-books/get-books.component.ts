import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IGoogleapiBook } from 'src/app/models/googleapi-book';
import { GoogleapiService } from 'src/app/services/googleapi.service';
import { InfobookDialogComponent } from './infobook-dialog/infobook-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.scss']
})
export class GetBooksComponent {


  user!: User;
  title = '';
  googleapiBooks: IGoogleapiBook[] = [];
  displayedColumns = ['info', 'title', 'authors', 'isbn', 'google_id', 'save'];


  constructor(
    private googleapiService: GoogleapiService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
    private booksService: BooksService,
    private router: Router
  ) { }


  ngOnInit() {
    this.user = this.authService.getUser();
  }


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
          this.authService.logout();
          this.router.navigate(['login']);
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


  storeBook(book: IGoogleapiBook) {
    this.booksService.storeBook(this.user.id, book).subscribe({
      next: res => {
        if (res.success) {
          this.matSnackBar.open('Stored!', '',
            {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              duration: 2000,
              panelClass: ['text-center']
            }
          );
        } else {
          console.error(res.message);
          this.matSnackBar.open('Error! Not stored', '',
            {
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
              duration: 2000,
              panelClass: ['text-center']
            }
          );
        }
      },
      error: (error: HttpHeaderResponse) => {
        console.error(error);
        this.authService.logout();
        this.router.navigate(['login']);
      }
    })
  }



}
