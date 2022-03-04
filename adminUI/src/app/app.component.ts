import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { StoreService } from './services/store.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  books: any[] = [];
  departments: any[] = [];
  catalogs: any[] = [];
  subscribers: any[] = [];
  issuingBooks: any[] = [];
  subscribersBook: any[] = [];
  returnDateOfBooks: any[] = [];
  booksToBranches: any[] = [];

  constructor(private httpService: HttpService, private storeService: StoreService) {}

  ngOnInit() {
    this.httpService.getBooks().subscribe((data: any[]) => {    
      this.books = data;  
      this.storeService.books = data;
      // console.log(data);
    });

    this.httpService.getDeportaments().subscribe((data: any[]) => {
      this.departments = data; 
      this.storeService.departments = data;      
      //console.log(data);
    });
    
    this.httpService.getCatalog().subscribe((data: any[]) => {
      this.catalogs = data;  
      this.storeService.catalogs = data;    
      //console.log(data);  
    });

    this.httpService.getSubscriber().subscribe((data: any[]) => {
      this.subscribers = data;      
      this.storeService.subscribers = data; 
    });

    this.httpService.getIssuing().subscribe((data: any[]) => {
      this.issuingBooks = data;
      this.storeService.issuedBooks = data;      
    });    

    this.httpService.getSubscribersBooks().subscribe((data: any[]) => {
      this.subscribersBook = data;
      this.storeService.subscribersBook = data;      
    }); 

    this.httpService.getReturnDateOfBooks().subscribe((data: any[]) => {
      this.returnDateOfBooks = data;
      this.storeService.returnDateOfBooks = data;      
    }); 
    
    this.httpService.getBooksToBranches().subscribe((data: any[]) => {
      this.booksToBranches = data;
      this.storeService.booksToBranches = data;      
    }); 
  }

}
