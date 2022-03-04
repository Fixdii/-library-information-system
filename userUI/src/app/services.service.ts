import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Book {
  book_code: number;
  name_book: string;
  author: string;
  rack_number: number;
  src: string;
}
export interface Subscriber{
  full_name: string;
  library_card: number;
}

@Injectable({
  providedIn: 'root',
})

export class ServicesService {
  constructor(private http: HttpClient) {}
  
  isAuthUserSubj = new BehaviorSubject<boolean>(false);

  getSubscriber(){
    return this.http.get<Subscriber[]>('http://localhost:8080/api/subscriber');
  }

  getBooks(){
    return this.http.get<Book[]>('http://localhost:8080/api/book')
  }
}
