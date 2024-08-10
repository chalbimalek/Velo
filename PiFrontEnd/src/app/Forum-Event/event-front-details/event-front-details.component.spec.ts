import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFrontDetailsComponent } from './event-front-details.component';

describe('EventFrontDetailsComponent', () => {
  let component: EventFrontDetailsComponent;
  let fixture: ComponentFixture<EventFrontDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFrontDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFrontDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
