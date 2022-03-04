import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksToBranchesComponent } from './books-to-branches.component';

describe('BooksToBranchesComponent', () => {
  let component: BooksToBranchesComponent;
  let fixture: ComponentFixture<BooksToBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksToBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksToBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
