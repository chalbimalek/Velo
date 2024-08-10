import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventsComponent } from './detail-event.component';

describe('DetailEventsComponent', () => {
  let component: DetailEventsComponent;
  let fixture: ComponentFixture<DetailEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
