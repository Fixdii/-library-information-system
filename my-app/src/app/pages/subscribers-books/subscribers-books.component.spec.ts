import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersBooksComponent } from './subscribers-books.component';

describe('SubscribersBooksComponent', () => {
  let component: SubscribersBooksComponent;
  let fixture: ComponentFixture<SubscribersBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribersBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
