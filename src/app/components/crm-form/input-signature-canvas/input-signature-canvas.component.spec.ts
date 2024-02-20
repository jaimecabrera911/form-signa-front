import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSignatureCanvasComponent } from './input-signature-canvas.component';

describe('InputSignatureCanvasComponent', () => {
  let component: InputSignatureCanvasComponent;
  let fixture: ComponentFixture<InputSignatureCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSignatureCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSignatureCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
