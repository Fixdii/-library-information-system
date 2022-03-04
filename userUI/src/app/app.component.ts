import { Component } from '@angular/core';
import { ServicesService } from './services.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private httpService: ServicesService){}
  
  ngOnInit() {
  }
}