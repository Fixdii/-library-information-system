import { Component, Input, OnInit } from '@angular/core';
import { BooksToBranches, SubscribersBook } from 'src/app/services/store.service';

@Component({
  selector: 'app-books-to-branches',
  templateUrl: './books-to-branches.component.html',
  styleUrls: ['./books-to-branches.component.css']
})
export class BooksToBranchesComponent implements OnInit {

  @Input() booksToBranches: BooksToBranches[];

  displayedColumns: string[] = [
    'department_name',
    'name_book',
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
