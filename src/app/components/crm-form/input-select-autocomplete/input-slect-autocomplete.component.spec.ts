import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectAutocompleteComponent } from './input-slect-autocomplete.component';

describe('InputSelectAutocompleteComponent', () => {
  let component: InputSelectAutocompleteComponent;
  let fixture: ComponentFixture<InputSelectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
