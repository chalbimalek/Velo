import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltemplateBackComponent } from './alltemplate-back.component';

describe('AlltemplateBackComponent', () => {
  let component: AlltemplateBackComponent;
  let fixture: ComponentFixture<AlltemplateBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltemplateBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltemplateBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
