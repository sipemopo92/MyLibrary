import { HttpHeaderResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-infomybook-dialog',
  templateUrl: './infomybook-dialog.component.html',
  styleUrls: ['./infomybook-dialog.component.scss']
})
export class InfomybookDialogComponent {

  read_count = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<InfomybookDialogComponent>,
    private booksService: BooksService
  ) { }


  isValidNumber(): boolean {
    const pattern = /^[0-9]*$/;
    return pattern.test(this.read_count);
  }

  update(){
    this.booksService.updateReadCount(this.book.pivot.user_id, this.book.pivot.book_id, parseInt(this.read_count)).subscribe({
      next: res => {
        if(res.success) {
        } else {
          console.error(res.message);
        }
        this.dialogRef.close();
      },
      error: (error: HttpHeaderResponse) => {
        console.error(error);
        this.dialogRef.close();
      }
    })
  }
}
