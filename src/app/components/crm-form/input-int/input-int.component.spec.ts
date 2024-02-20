import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIntComponent } from './input-int.component';

describe('InputIntComponent', () => {
  let component: InputIntComponent;
  let fixture: ComponentFixture<InputIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
