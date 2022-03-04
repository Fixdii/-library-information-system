import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './pages/books/books.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HttpClientModule }   from '@angular/common/http';
import { HttpService } from './http.service';
import { MatTableModule } from '@angular/material/table';
import { SubscriberComponent } from './pages/subscriber/subscriber.component';
import { IssuingComponent } from './pages/issuing/issuing.component';
import { MatButtonModule } from '@angular/material/button';
import { AddComponent } from './shared/add/add.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { StoreService } from './services/store.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SubscribersBooksComponent } from './pages/subscribers-books/subscribers-books.component';
import { BooksToBranchesComponent } from './pages/books-to-branches/books-to-branches.component';
import { ReturnDateOfBooksComponent } from './pages/return-date-of-books/return-date-of-books.component';




@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    DepartmentsComponent,
    CatalogComponent,
    SubscriberComponent,
    IssuingComponent,
    AddComponent,
    SubscribersBooksComponent,
    BooksToBranchesComponent,
    ReturnDateOfBooksComponent    
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    HttpService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
