import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Book, BooksToBranches, Catalog, Department, IssuedBook, ReturnDateOfBooks, Subscriber, SubscribersBook } from './services/store.service';
  
@Injectable()
export class HttpService{
    
      
    constructor(private http: HttpClient){ }
      
    getBooks(){
        return this.http.get<Book[]>('http://localhost:8080/api/book')
    }
    postBook = (body: Book) => {
        return this.http.post<Book>('http://localhost:8080/api/book',body);
    }
    deliteBook = (id: number) => {         
        return this.http.delete<Book>(`http://localhost:8080/api/book/${id}`);
    }   
    putBook = (body: Book) => {
        return this.http.put<Book>(`http://localhost:8080/api/book`,body);
    }



    getDeportaments(){
        return this.http.get<Department[]>('http://localhost:8080/api/deportament')
    }
    postDeportament = (body: Book) => {
        return this.http.post<Department>('http://localhost:8080/api/deportament',body);
    }
    deliteDeportament = (id: number) => {         
        return this.http.delete<Department>(`http://localhost:8080/api/deportament/${id}`);
    }   
    putDeportament = (body: Book) => {
        return this.http.put<Department>(`http://localhost:8080/api/deportament`,body);
    }



    getSubscriber(){
        return this.http.get<Subscriber[]>('http://localhost:8080/api/subscriber')
    }
    postSubscriber = (body: Book) => {
        console.log(body);
        
        return this.http.post<Subscriber>('http://localhost:8080/api/subscriber',body);
    }
    deliteSubscriber = (id: number) => {         
        return this.http.delete<Subscriber>(`http://localhost:8080/api/subscriber/${id}`);
    }   
    putSubscriber = (body: Book) => {
        return this.http.put<Subscriber>(`http://localhost:8080/api/subscriber`,body);
    }



    getCatalog(){
        return this.http.get<Catalog[]>('http://localhost:8080/api/katalog')
    }
    postKatalog = (body: Book) => {
        return this.http.post<Catalog>('http://localhost:8080/api/katalog',body);
    }
    deliteCatalog = (id: number) => {         
        return this.http.delete<Catalog>(`http://localhost:8080/api/katalog/${id}`);
    }   
    putCatalog = (body: Catalog) => {
        return this.http.put<Catalog>(`http://localhost:8080/api/katalog`,body);
    }


  
    getIssuing(){
        return this.http.get<IssuedBook[]>('http://localhost:8080/api/issuing')
    }  
    postIssuing = (body: Book) => {
        return this.http.post<IssuedBook>('http://localhost:8080/api/issuing',body);
    }
    deliteIssuing = (id: number) => {         
        return this.http.delete<IssuedBook>(`http://localhost:8080/api/issuing/${id}`);
    }   
    putIssuing = (body: Book) => {
        return this.http.put<IssuedBook>(`http://localhost:8080/api/issuing`,body);
    }
    

    getSubscribersBooks(){
        return this.http.get<SubscribersBook[]>(`http://localhost:8080/api/subscribers_Books`);
    }
    getBooksToBranches(){
        return this.http.get<BooksToBranches[]>(`http://localhost:8080/api/books_to_branches`);
    }
    getReturnDateOfBooks(){
        return this.http.get<ReturnDateOfBooks[]>(`http://localhost:8080/api/return_date_of_books`);
    }
   
   

}