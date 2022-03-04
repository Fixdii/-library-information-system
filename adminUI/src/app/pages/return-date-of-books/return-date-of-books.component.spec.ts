import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDateOfBooksComponent } from './return-date-of-books.component';

describe('ReturnDateOfBooksComponent', () => {
  let component: ReturnDateOfBooksComponent;
  let fixture: ComponentFixture<ReturnDateOfBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDateOfBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDateOfBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
