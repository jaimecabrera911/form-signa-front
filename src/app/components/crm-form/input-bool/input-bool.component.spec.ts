import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBoolComponent } from './input-bool.component';

describe('InputBoolComponent', () => {
  let component: InputBoolComponent;
  let fixture: ComponentFixture<InputBoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
