import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDefiComponent } from './register-defi.component';

describe('RegisterDefiComponent', () => {
  let component: RegisterDefiComponent;
  let fixture: ComponentFixture<RegisterDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDefiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
