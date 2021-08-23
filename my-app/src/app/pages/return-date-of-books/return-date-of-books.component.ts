import { Component, Input, OnInit } from '@angular/core';
import { ReturnDateOfBooks, SubscribersBook } from 'src/app/services/store.service';

@Component({
  selector: 'app-return-date-of-books',
  templateUrl: './return-date-of-books.component.html',
  styleUrls: ['./return-date-of-books.component.css']
})
export class ReturnDateOfBooksComponent implements OnInit {

  @Input() returnDateOfBooks: ReturnDateOfBooks[];

  displayedColumns: string[] = [
    'full_name',
    'name_book',
    'return_date',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
