import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgfr78Component } from './sgfr78.component';

describe('Sgfr78Component', () => {
  let component: Sgfr78Component;
  let fixture: ComponentFixture<Sgfr78Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sgfr78Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sgfr78Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
