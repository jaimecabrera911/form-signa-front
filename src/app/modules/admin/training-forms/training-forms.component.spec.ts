import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFormsComponent } from './training-forms.component';

describe('TrainingFormsComponent', () => {
  let component: TrainingFormsComponent;
  let fixture: ComponentFixture<TrainingFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
