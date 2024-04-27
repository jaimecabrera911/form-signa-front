import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUploadImageComponent } from './input-upload-image.component';

describe('InputUploadImageComponent', () => {
  let component: InputUploadImageComponent;
  let fixture: ComponentFixture<InputUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUploadImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
