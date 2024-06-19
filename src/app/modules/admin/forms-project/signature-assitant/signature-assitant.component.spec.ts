import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureAssitantComponent } from './signature-assitant.component';

describe('SignatureAssitantComponent', () => {
  let component: SignatureAssitantComponent;
  let fixture: ComponentFixture<SignatureAssitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureAssitantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureAssitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
