import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerSheetComponent } from './singer-sheet.component';

describe('SingerSheetComponent', () => {
  let component: SingerSheetComponent;
  let fixture: ComponentFixture<SingerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
