import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSignatureComponent } from './canvas-signature.component';

describe('CanvasSignatureComponent', () => {
  let component: CanvasSignatureComponent;
  let fixture: ComponentFixture<CanvasSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
