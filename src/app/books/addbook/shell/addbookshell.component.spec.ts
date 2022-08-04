import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookComponentShell } from './addbookshell.component';

describe('ShellComponent', () => {
  let component: AddBookComponentShell;
  let fixture: ComponentFixture<AddBookComponentShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookComponentShell ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookComponentShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
