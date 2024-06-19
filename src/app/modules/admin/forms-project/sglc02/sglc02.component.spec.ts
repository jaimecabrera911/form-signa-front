import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sglc02Component } from './sglc02.component';

describe('Sglc02Component', () => {
  let component: Sglc02Component;
  let fixture: ComponentFixture<Sglc02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sglc02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sglc02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
