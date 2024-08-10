import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarpoolingComponent } from './register-carpooling.component';

describe('RegisterCarpoolingComponent', () => {
  let component: RegisterCarpoolingComponent;
  let fixture: ComponentFixture<RegisterCarpoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCarpoolingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCarpoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
