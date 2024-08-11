import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedUsersDialogComponent } from './accepted-users-dialog.component';

describe('AcceptedUsersDialogComponent', () => {
  let component: AcceptedUsersDialogComponent;
  let fixture: ComponentFixture<AcceptedUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedUsersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
