import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaitlsbackComponent } from './detaitlsback.component';

describe('DetaitlsbackComponent', () => {
  let component: DetaitlsbackComponent;
  let fixture: ComponentFixture<DetaitlsbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaitlsbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaitlsbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
