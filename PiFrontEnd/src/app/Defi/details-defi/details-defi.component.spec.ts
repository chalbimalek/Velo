import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDefiComponent } from './details-defi.component';

describe('DetailsDefiComponent', () => {
  let component: DetailsDefiComponent;
  let fixture: ComponentFixture<DetailsDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDefiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
