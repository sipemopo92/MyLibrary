import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGoogleapiBook } from 'src/app/models/googleapi-book';


@Component({
  selector: 'app-infobook-dialog',
  templateUrl: './infobook-dialog.component.html',
  styleUrls: ['./infobook-dialog.component.scss']
})
export class InfobookDialogComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public book: IGoogleapiBook,
  ) { }

  
}
