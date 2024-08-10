import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefiComponent } from './list-defi.component';

describe('ListDefiComponent', () => {
  let component: ListDefiComponent;
  let fixture: ComponentFixture<ListDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
