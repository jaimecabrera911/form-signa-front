import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesItemsComponent } from './tables-items.component';

describe('TablesItemsComponent', () => {
  let component: TablesItemsComponent;
  let fixture: ComponentFixture<TablesItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
