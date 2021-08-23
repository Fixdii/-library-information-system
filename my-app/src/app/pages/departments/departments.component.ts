import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { Department, StoreService } from 'src/app/services/store.service';
import { AddComponent } from 'src/app/shared/add/add.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  @Input() departments: Department[];

  displayedColumns: string[] = [
    'department_code',
    'department_name',
    'department_address',
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
            id: 'department_name',
            name: 'Отделение',
            type: 'text',
          },
          {
            id: 'department_address',
            name: 'Адрес',
            type: 'text',
          },
        ],
        request: (body) => this.httpService.postDeportament(body).pipe(
          map((d) => {
            const departments = [...this.departments];
            departments.push(d);
            this.departments = departments;
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
    this.httpService.deliteDeportament(id).subscribe(data => {
      this.departments = this.departments.filter(b => b.department_code !== id);
    });; 
  }
  edit(elem: Department) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      data: {
        columnConfigs: [{
            id: 'department_code',
            name: 'id',
            type: 'text',
            isHidden: true,
            value: elem.department_code
          }, {
            id: 'department_name',
            name: 'Название отделения',
            type: 'text',
            value: elem.department_name
          }, {
            id: 'department_address',
            name: 'Адрес',
            type: 'text',
            value: elem.department_address
          }],
          request: (body) => this.httpService.putDeportament(body).pipe(
            map((d) => {
              const id = this.departments.findIndex(
                (item) => item.department_code == body.department_code
              );
              const departments = [...this.departments];
              departments[id] = body;
              this.departments = departments;
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
