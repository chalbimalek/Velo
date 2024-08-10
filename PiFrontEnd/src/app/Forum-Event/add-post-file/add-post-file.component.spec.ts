import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostFileComponent } from './add-post-file.component';

describe('AddPostFileComponent', () => {
  let component: AddPostFileComponent;
  let fixture: ComponentFixture<AddPostFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
