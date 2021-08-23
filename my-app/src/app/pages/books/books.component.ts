import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/http.service';
import { Book, StoreService } from 'src/app/services/store.service';
import { AddComponent } from 'src/app/shared/add/add.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  @Input() books: Book[];

  displayedColumns: string[] = [
    'book_code',
    'name_book',
    'author',
    'rack_number',
    'buttons',
  ];

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private httpService: HttpService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  onchange() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      data: {
        columnConfigs: [
          {
            id: 'name_book',
            name: 'Название книги',
            type: 'text',
          },
          {
            id: 'author',
            name: 'Автор',
            type: 'text',
          },
          {
            id: 'rack_number',
            name: 'Номер стелажа',
            type: 'text',
          },
        ],
        request: (body) =>
          this.httpService.postBook(body).pipe(
            map((d) => {
              const books = [...this.books];
              books.push(d);
              this.books = books;
              return d;
            })
          ),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('CatalogComponent was closed');
    });
  }

  delite(id: number) {
    this.httpService.deliteBook(id).subscribe((data) => {
      this.books = this.books.filter((b) => b.book_code !== id);
    });
  }
  edit(elem: Book) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      data: {
        columnConfigs: [
          {
            id: 'book_code',
            name: 'id',
            type: 'text',
            isHidden: true,
            value: elem.book_code,
          },
          {
            id: 'name_book',
            name: 'Название книги',
            type: 'text',
            value: elem.name_book,
          },
          {
            id: 'author',
            name: 'Автор',
            type: 'text',
            value: elem.author,
          },
          {
            id: 'rack_number',
            name: 'Номер стелажа',
            type: 'text',
            value: elem.rack_number,
          },
        ],
        request: (body) =>
          this.httpService.putBook(body).pipe(
            map((d) => {
              const id = this.books.findIndex(
                (item) => item.book_code == body.book_code
              );
              const books = [...this.books];
              books[id] = body;
              this.books = books;
              return d;
            })
          ),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('CatalogComponent was closed');
    });
  }
}
function tap(
  arg0: () => void
): import('rxjs').OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}
