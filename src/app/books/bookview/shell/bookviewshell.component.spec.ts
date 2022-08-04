import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewShellComponent } from './bookviewshell.component';

describe('ShellComponent', () => {
  let component: BookViewShellComponent;
  let fixture: ComponentFixture<BookViewShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookViewShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
