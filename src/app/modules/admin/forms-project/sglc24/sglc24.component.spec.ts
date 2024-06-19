import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sglc24Component } from './sglc24.component';

describe('Sglc24Component', () => {
  let component: Sglc24Component;
  let fixture: ComponentFixture<Sglc24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sglc24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sglc24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
