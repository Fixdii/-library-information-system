import { Injectable } from '@angular/core';

export interface Catalog {
  book_code_branches: number;
  book_code: number;
  department_code: number;
  inventory_number: number;
  rack_number: number;
}

export interface Book {
  book_code: number;
  name_book: string;
  author: string;
  rack_number: number;
}

export interface Department {
  department_code: number;
  department_name: string;
  department_address: string;
}

export interface Subscriber {
  subscriber_code: number;
  full_name: string;
  library_card: number;
}

export interface IssuedBook {
  issue_code: number;
  subscriber_code: number;
  book_code_branches: number;
  pickup_date: string;
  return_date: string;
}

export interface SubscribersBook {
  full_name: string;
  name_book: string;
  pickup_date: string;
  return_date: string;
}

export interface BooksToBranches {
  department_name: string;
  name_book: string;  
}

export interface ReturnDateOfBooks {
  full_name: string;
  name_book: string;
  return_date: string;
}



@Injectable()
export class StoreService {
  books: Book[] = [];
  departments: Department[] = [];
  catalogs: Catalog[] = [];
  subscribers: Subscriber[] = [];
  issuedBooks: IssuedBook[] = [];
  subscribersBook: SubscribersBook[] = [];
  returnDateOfBooks: ReturnDateOfBooks[] = [];
  booksToBranches: BooksToBranches[] = [];

  constructor() { }
}
