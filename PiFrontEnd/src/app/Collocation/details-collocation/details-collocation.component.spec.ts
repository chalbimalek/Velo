import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCollocationComponent } from './details-collocation.component';

describe('DetailsCollocationComponent', () => {
  let component: DetailsCollocationComponent;
  let fixture: ComponentFixture<DetailsCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCollocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
