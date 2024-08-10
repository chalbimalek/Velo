import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltemplatefrontComponent } from './alltemplatefront.component';

describe('AlltemplatefrontComponent', () => {
  let component: AlltemplatefrontComponent;
  let fixture: ComponentFixture<AlltemplatefrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltemplatefrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltemplatefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
