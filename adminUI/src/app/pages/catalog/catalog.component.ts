import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { Catalog, StoreService } from 'src/app/services/store.service';
import { AddComponent } from 'src/app/shared/add/add.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  @Input() catalogs: Catalog[];

  displayedColumns: string[] = [
    'book_code_branches',
    'book_code',
    'department_code',
    'inventory_number',
    'rack_number',
    'buttons',
  ];

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {}

  onchange() {
    zip(
      this.httpService.getDeportaments(),
      this.httpService.getBooks()
    ).subscribe(([departments, books]) => {
      const columnConfig = [
        {
          id: 'book_code',
          name: 'Книга',
          type: 'combo',
          data: books.map((book) => ({
            id: book.book_code,
            name: `${book.name_book}; Автор: ${book.author}`,
          })),
        },
        {
          id: 'department_code',
          name: 'Отдееление',
          type: 'combo',
          data: departments.map((deport) => ({
            id: deport.department_code,
            name: `${deport.department_name}; Адрес: ${deport.department_address}`,
          })),
        },
        {
          id: 'inventory_number',
          name: 'Инвентарный номер',
          type: 'text',
        },
        {
          id: 'rack_number',
          name: 'Номер стелажа',
          type: 'text',
        },
      ];

      const dialogRef = this.dialog.open(AddComponent, {
        width: '550px',
        data: {
          columnConfigs: columnConfig,
          request: (body) =>
            this.httpService.postKatalog(body).pipe(
              map((d) => {
                const catalogs = [...this.catalogs];
                catalogs.push(d);
                this.catalogs = catalogs;
                return d;
              })
            ),
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('CatalogComponent was closed');
      });
    });
  }

  delite(id: number) {
    this.httpService.deliteCatalog(id).subscribe((data) => {
      this.catalogs = this.catalogs.filter((b) => b.book_code_branches !== id);
    });
  }
  edit(elem: Catalog) {
    zip(
      this.httpService.getDeportaments(),
      this.httpService.getBooks()
    ).subscribe(([departments, books]) => {
      const columnConfig = [
        {
          id: 'book_code_branches',
          name: 'id',
          type: 'text',
          isHidden: true,
          value: elem.book_code_branches,
        },
        {
          id: 'book_code',
          name: 'Книга',
          type: 'combo',
          data: books.map((book) => ({
            id: book.book_code,
            name: `${book.name_book}; Автор: ${book.author}`,
          })),
          value: elem.book_code,
        },
        {
          id: 'department_code',
          name: 'Отдееление',
          type: 'combo',
          data: departments.map((deport) => ({
            id: deport.department_code,
            name: `${deport.department_name}; Адрес: ${deport.department_address}`,
          })),
          value: elem.department_code,
        },
        {
          id: 'inventory_number',
          name: 'Инвентарный номер',
          type: 'text',
          value: elem.inventory_number,
        },
        {
          id: 'rack_number',
          name: 'Номер стелажа',
          type: 'text',
          value: elem.rack_number,
        },
      ];

      const dialogRef = this.dialog.open(AddComponent, {
        width: '550px',
        data: {
          columnConfigs: columnConfig,
          request: (body) =>
            this.httpService.putCatalog(body).pipe(
              map((d) => {
                const id = this.catalogs.findIndex(
                  (item) => item.book_code_branches == body.book_code_branches
                );
                const catalogs = [...this.catalogs];
                catalogs[id] = body;
                this.catalogs = catalogs;
                return d;
              })
            ),
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('CatalogComponent was closed');
      });
    });
  }
}
