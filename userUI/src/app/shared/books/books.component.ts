import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  savedImages: any[] = [];
  keyword: string = '';
  page: number = 0;
  length = 17;
  pageSize = 17;
  pageSizeOptions: number[] = [17];
  searchValue: string = '';
  src: string = '';
  books: any[] = [];

  isAuthorised = false;

  @Input() mode: 'all' | 'bookmarks' = 'all';

  constructor(
    private servicesService: ServicesService,
  ) {}

  paginator(event: any) {
    this.page = event.pageIndex + 1;

    if (this.keyword && this.keyword.length > 0) {
      this.servicesService
        .getBooks()
        .toPromise()
        .then((res) => {
          this.books = res;
          for(let i in res){
            console.log(i);            
          }
        });
    }
  }

  save(event: any) {
    const target = event.target;
    const parent = target.closest('.card');
    const url = parent.querySelector('img').getAttribute('src');
    
    if (this.mode !== 'bookmarks') {
      for (let obj of this.savedImages) {
        if (obj.src === url) {
          alert('Вы уже выбрали эту книгу!');
          return;
        }
      }
      this.savedImages.push({ src: url });
      localStorage.setItem('url', JSON.stringify(this.savedImages));
    } else {
      this.delete(url);
    }
  }

  delete(url: string) {
    for (let obj of this.savedImages) {
      if (obj.src === url) {        
        let index = this.savedImages.indexOf(obj);
        this.savedImages.splice(index, 1);
        localStorage.setItem('url', JSON.stringify(this.savedImages));
        this.showSavedPhoto();
      }
    }
  }

  showSavedPhoto() { 
    this.books = this.serviceLocalStorage();
  }

  serviceLocalStorage(){    
    const returnUrl: any = localStorage.getItem('url');   
    const value = JSON.parse(returnUrl);    

    if(!value || !returnUrl){
       this.savedImages = [];
       return [];
    }

    this.savedImages = value || [];        
    return value || [];
  } 

  ngOnInit(): void {
    if (this.mode === 'bookmarks') {
      this.showSavedPhoto();
    } else {
      this.serviceLocalStorage();
      this.servicesService.getBooks().subscribe((data: any[]) => {
        this.books = data;
        for(let i in data){
          this.length = +i;          
          this.pageSize = +i;          
          this.pageSizeOptions = [+i];          
        }
      });
    }

    this.servicesService.isAuthUserSubj.subscribe(res => {
      this.isAuthorised = res;
    });
  }
}
