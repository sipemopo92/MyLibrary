import { HttpHeaderResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { InfomybookDialogComponent } from './infomybook-dialog/infomybook-dialog.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {


  user!: User;
  books: Book[] = [];
  displayedColumns = ['info', 'title', 'authors', 'read_count', 'added_at', 'delete'];


  constructor(
    private authService: AuthService,
    private router: Router,
    private booksService: BooksService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog,

  ) { }


  ngOnInit() {
    this.user = this.authService.getUser();
    this.getBooks()
  }


  getBooks() {
    this.booksService.getBooksByUserId(this.user.id).subscribe({
      next: res => {
        if (res.success) {
          this.books = res.data;
        } else {
          console.error(res.message);
        }
      },
      error: (error: HttpHeaderResponse) => {
        console.error(error);
        this.authService.logout();
        this.router.navigate(['login']);
      }
  })
  }


  showInfo(book: Book) {
    let dialogRef = this.matDialog.open(InfomybookDialogComponent, {
      disableClose: true,
      data: book
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });
  }


  deleteRow(book: Book) {
    this.booksService.removeBook(this.user.id, book.id).subscribe({
      next: res => {
        if (res.success) {
          this.getBooks();
          
        } else {
          console.error(res.message);
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
