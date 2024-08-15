import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sglc04Component } from './sglc04.component';

describe('Sglc04Component', () => {
  let component: Sglc04Component;
  let fixture: ComponentFixture<Sglc04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sglc04Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sglc04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
