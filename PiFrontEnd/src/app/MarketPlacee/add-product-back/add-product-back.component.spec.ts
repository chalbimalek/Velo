import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductBackComponent } from './add-product-back.component';

describe('AddProductBackComponent', () => {
  let component: AddProductBackComponent;
  let fixture: ComponentFixture<AddProductBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
