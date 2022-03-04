import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { BooksComponent } from './shared/books/books.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

const appRoutes: Routes = [
  { path: '', component: AllBooksComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: '**', component: AllBooksComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    AuthFormComponent,
    BookmarksComponent,
    BooksComponent,
    AllBooksComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
