import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarpoolingComponent } from './list-carpooling.component';

describe('ListCarpoolingComponent', () => {
  let component: ListCarpoolingComponent;
  let fixture: ComponentFixture<ListCarpoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCarpoolingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCarpoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
