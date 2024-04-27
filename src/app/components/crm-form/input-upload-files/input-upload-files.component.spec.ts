import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUploadFilesComponent } from './input-upload-files.component';

describe('InputUploadFilesComponent', () => {
  let component: InputUploadFilesComponent;
  let fixture: ComponentFixture<InputUploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUploadFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
