import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollocationComponent } from './list-collocation.component';

describe('ListCollocationComponent', () => {
  let component: ListCollocationComponent;
  let fixture: ComponentFixture<ListCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCollocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
