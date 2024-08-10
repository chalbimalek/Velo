import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaryingmodalcontentComponent } from './varyingmodalcontent.component';

describe('VaryingmodalcontentComponent', () => {
  let component: VaryingmodalcontentComponent;
  let fixture: ComponentFixture<VaryingmodalcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaryingmodalcontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaryingmodalcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
