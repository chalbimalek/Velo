import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutShowDialogComponent } from './produt-show-dialog.component';

describe('ProdutShowDialogComponent', () => {
  let component: ProdutShowDialogComponent;
  let fixture: ComponentFixture<ProdutShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutShowDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
