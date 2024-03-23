import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBirthDateComponent } from './input-birth-date.component';

describe('InputBirthDateComponent', () => {
  let component: InputBirthDateComponent;
  let fixture: ComponentFixture<InputBirthDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBirthDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBirthDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
