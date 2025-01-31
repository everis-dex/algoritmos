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

  describe('onResize', () => {
    it('should update isDesktop when window is resized', () => {
      const checkBreakpointSpy = spyOn(component, 'checkBreakpoint');

      component.onResize();

      expect(checkBreakpointSpy).toHaveBeenCalled();
    });
  });

  it('should emit selectChip event', () => {
    const selectChipSpy = spyOn(component['_selectChip'], 'emit');

    const chipSelected = 'Chip 1';
    component.selectChip(chipSelected);

    expect(selectChipSpy).toHaveBeenCalled();
  });

  it('should emit deselectChip event', () => {
    const deselectChipSpy = spyOn(component['_deselectChip'], 'emit');

    const chipSelected = 'Chip 1';
    component.deselectChip(chipSelected);

    expect(deselectChipSpy).toHaveBeenCalled();
  });
});
