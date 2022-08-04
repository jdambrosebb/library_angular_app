import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistshellComponent } from './booklistshell.component';

describe('BooklistshellComponent', () => {
  let component: BooklistshellComponent;
  let fixture: ComponentFixture<BooklistshellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooklistshellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistshellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
