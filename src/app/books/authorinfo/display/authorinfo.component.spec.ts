import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorinfoComponent } from './authorinfo.component';

describe('AuthorinfoComponent', () => {
  let component: AuthorinfoComponent;
  let fixture: ComponentFixture<AuthorinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
