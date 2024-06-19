import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sglc25Component } from './sglc25.component';

describe('Sglc25Component', () => {
  let component: Sglc25Component;
  let fixture: ComponentFixture<Sglc25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sglc25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sglc25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
