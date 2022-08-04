import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorinfoshellComponent } from './authorinfoshell.component';

describe('AuthorinfoshellComponent', () => {
  let component: AuthorinfoshellComponent;
  let fixture: ComponentFixture<AuthorinfoshellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorinfoshellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorinfoshellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
