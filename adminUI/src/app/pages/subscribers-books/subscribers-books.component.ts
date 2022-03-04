import { Component, Input, OnInit } from '@angular/core';
import { SubscribersBook } from 'src/app/services/store.service';

@Component({
  selector: 'app-subscribers-books',
  templateUrl: './subscribers-books.component.html',
  styleUrls: ['./subscribers-books.component.css']
})
export class SubscribersBooksComponent implements OnInit {

  @Input() subscribersBook: SubscribersBook[];

  displayedColumns: string[] = [
    'full_name',
    'name_book',
    'pickup_date',
    'return_date',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
