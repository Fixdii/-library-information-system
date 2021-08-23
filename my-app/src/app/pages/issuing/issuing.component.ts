import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { IssuedBook, StoreService } from 'src/app/services/store.service';
import { AddComponent } from 'src/app/shared/add/add.component';

@Component({
  selector: 'app-issuing',
  templateUrl: './issuing.component.html',
  styleUrls: ['./issuing.component.css'],
})
export class IssuingComponent implements OnInit {
  @Input() issuingBooks: IssuedBook[];

  displayedColumns: string[] = [
    'issue_code',
    'subscriber_code',
    'book_code_branches',
    'pickup_date',
    'return_date',
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
      this.httpService.getSubscriber(),
      this.httpService.getCatalog()
    ).subscribe(([subscribers, catalogs]) => {
      const columnConfig = [
        {
          id: 'subscriber_code',
          name: 'ФИО (№ Читательского билета:)',
          type: 'combo',
          data: subscribers.map((subscriber) => ({
            id: subscriber.subscriber_code,
            name: `ФИО:${subscriber.full_name}; № Читательского билета: ${subscriber.library_card}`,
          })),
        },
        {
          id: 'book_code_branches',
          name: 'ИНВ',
          type: 'combo',
          data: catalogs.map((catalog) => ({
            id: catalog.book_code_branches,
            name: `ИНВ:${catalog.inventory_number};`,
          })),
        },
        {
          id: 'pickup_date',
          name: 'Дата выдачи (1999-01-27)',
          type: 'text',
        },
        {
          id: 'return_date',
          name: 'Дата возврата (1999-01-27)',
          type: 'text',
        },
      ];

      const dialogRef = this.dialog.open(AddComponent, {
        width: '550px',
        data: {
          columnConfigs: columnConfig,
          request: (body) =>
            this.httpService.postIssuing(body).pipe(
              map((d) => {
                const issuingBooks = [...this.issuingBooks];
                issuingBooks.push(d);
                this.issuingBooks = issuingBooks;
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
    this.httpService.deliteIssuing(id).subscribe((data) => {
      this.issuingBooks = this.issuingBooks.filter((b) => b.issue_code !== id);
    });
  }

  edit(elem: IssuedBook) {
    zip(
      this.httpService.getSubscriber(),
      this.httpService.getCatalog()
    ).subscribe(([subscribers, catalogs]) => {
      const columnConfig = [
        {
          id: 'issue_code',
          name: 'id',
          type: 'text',
          isHidden: true,
          value: elem.issue_code,
        },
        {
          id: 'subscriber_code',
          name: 'ФИО (№ Читательского билета:)',
          type: 'combo',
          data: subscribers.map((subscriber) => ({
            id: subscriber.subscriber_code,
            name: `ФИО:${subscriber.full_name}; № Читательского билета: ${subscriber.library_card}`,
          })),
          value: elem.subscriber_code,
        },
        {
          id: 'book_code_branches',
          name: 'ИНВ',
          type: 'combo',
          data: catalogs.map((catalog) => ({
            id: catalog.book_code_branches,
            name: `ИНВ:${catalog.inventory_number};`,
          })),
          value: elem.book_code_branches,
        },
        {
          id: 'pickup_date',
          name: 'Дата выдачи (1999-01-27)',
          type: 'text',
          value: elem.pickup_date,
        },
        {
          id: 'return_date',
          name: 'Дата возврата (1999-01-27)',
          type: 'text',
          value: elem.return_date,
        },
      ];

      const dialogRef = this.dialog.open(AddComponent, {
        width: '550px',
        data: {
          columnConfigs: columnConfig,
          request: (body) =>
            this.httpService.putIssuing(body).pipe(
              map((d) => {
                const id = this.issuingBooks.findIndex(
                  (item) => item.issue_code == body.issue_code
                );
                const issuingBooks = [...this.issuingBooks];
                issuingBooks[id] = body;
                this.issuingBooks = issuingBooks;
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
