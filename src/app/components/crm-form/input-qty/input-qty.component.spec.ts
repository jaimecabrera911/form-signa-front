import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQtyComponent } from './input-qty.component';

describe('InputQtyComponent', () => {
  let component: InputQtyComponent;
  let fixture: ComponentFixture<InputQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputQtyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
