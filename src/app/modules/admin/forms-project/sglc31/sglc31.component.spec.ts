import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sglc31Component } from './sglc31.component';

describe('Sglc31Component', () => {
  let component: Sglc31Component;
  let fixture: ComponentFixture<Sglc31Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sglc31Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sglc31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
