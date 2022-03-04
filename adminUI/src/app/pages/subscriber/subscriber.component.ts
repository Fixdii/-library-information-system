import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { StoreService, Subscriber } from 'src/app/services/store.service';
import { AddComponent } from 'src/app/shared/add/add.component';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css'],
})
export class SubscriberComponent implements OnInit {
  @Input() subscribers: Subscriber[];

  displayedColumns: string[] = [
    'subscriber_code',
    'full_name',
    'library_card',
    'buttons',
  ];

  columnConfig: any[] = null;

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {}

  onchange() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      data: {
        columnConfigs: [
          {
            id: 'full_name',
            name: 'ФИО',
            type: 'text',
          },
          {
            id: 'library_card',
            name: '№ Читательского билета',
            type: 'text',
          },
        ],
        request: (body) =>
          this.httpService.postSubscriber(body).pipe(
            map((d) => {
              const subscribers = [...this.subscribers];
              subscribers.push(d);
              this.subscribers = subscribers;
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
    this.httpService.deliteSubscriber(id).subscribe((data) => {
      this.subscribers = this.subscribers.filter(
        (b) => b.subscriber_code !== id
      );
    });
  }
  edit(elem: Subscriber) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      data: {
        columnConfigs: [
          {
            id: 'subscriber_code',
            name: 'id',
            type: 'text',
            isHidden: true,
            value: elem.subscriber_code,
          },
          {
            id: 'full_name',
            name: 'ФИО',
            type: 'text',
            value: elem.full_name,
          },
          {
            id: 'library_card',
            name: '№ Читательского билета',
            type: 'text',
            value: elem.library_card,
          },
        ],
        request: (body) =>
          this.httpService.putSubscriber(body).pipe(
            map((d) => {
              const id = this.subscribers.findIndex(
                (item) => item.subscriber_code == body.subscriber_code
              );
              const subscribers = [...this.subscribers];
              subscribers[id] = body;
              this.subscribers = subscribers;
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
