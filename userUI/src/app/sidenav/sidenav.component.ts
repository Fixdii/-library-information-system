import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAuthorised = false;

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.isAuthUserSubj.subscribe(res => {
      this.isAuthorised = res;
    });
  }

}
