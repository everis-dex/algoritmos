import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsComponent } from './chips.component';

describe('ChipsComponent', () => {
  let component: ChipsComponent;
  let fixture: ComponentFixture<ChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectChip event', () => {
    const changeViewSpy = spyOn(component['_selectChip'], 'emit');

    const chipSelected = 'TestChip';
    component.handleChipClick(chipSelected);

    expect(changeViewSpy).toHaveBeenCalled();
  });
});
