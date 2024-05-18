import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsProjectComponent } from './forms-project.component';

describe('FormsProjectComponent', () => {
  let component: FormsProjectComponent;
  let fixture: ComponentFixture<FormsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
