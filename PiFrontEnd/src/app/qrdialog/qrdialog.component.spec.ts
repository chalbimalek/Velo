import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRDialogComponent } from './qrdialog.component';

describe('QRDialogComponent', () => {
  let component: QRDialogComponent;
  let fixture: ComponentFixture<QRDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
