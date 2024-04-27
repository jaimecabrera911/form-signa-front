import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDocumentsComponent } from './panel-documents.component';

describe('PanelDocumentsComponent', () => {
  let component: PanelDocumentsComponent;
  let fixture: ComponentFixture<PanelDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
