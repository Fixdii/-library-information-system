import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isAuthorised = false;

  constructor(public dialog: MatDialog, private servicesService: ServicesService) { }

  openFormLogin(){
    console.log("open");    
  }

  ngOnInit(): void {
    this.servicesService.isAuthUserSubj.subscribe(res => {
      this.isAuthorised = res;
    });
  }

  openDialog(): void {
    if (!this.isAuthorised) {
      const dialogRef = this.dialog.open(AuthFormComponent, {
        width: '500px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.servicesService.isAuthUserSubj.next(true);
        }
      });
    } else {
      this.servicesService.isAuthUserSubj.next(false);
    }
    
  }

}
