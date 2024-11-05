import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';
import { TAGS } from '../../../constants/search-filters.const';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.tags = TAGS;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter and sort tags with input value matching the start of tags', () => {
    const inputValue = 'se';
    component.filterTags(inputValue);

    expect(component.filteredTags).toEqual(['Seguretat informàtica']);
  });

  it('should filter tags with input value matching inside tags', () => {
    const inputValue = 'da';
    component.filterTags(inputValue);

    expect(component.filteredTags).toEqual([
      'Anàlisi de dades',
      'Protecció de dades',
    ]);
  });

  it('should toggle accordion display', () => {
    const accordionId = '1';
    component.toggleStates[accordionId] = { display: false, rotation: false };
    component.toggle(accordionId);

    expect(component.toggleStates[accordionId]).toEqual({
      display: true,
      rotation: true,
    });
  });

  it('should disable rotation on tag select', () => {
    component.isRotation = true;

    component.handleTagSelect();

    expect(component.isRotation).toBeFalse();
  });

  it('should handle search input correctly', () => {
    const filterTagsSpy = spyOn(component, 'filterTags');
    const event = new Event('input');
    const inputElement = document.createElement('input');
    inputElement.value = 'testValue';

    Object.defineProperty(event, 'target', { value: inputElement });

    component.handleInput(event);

    expect(component.hasValue).toBeTrue();
    expect(filterTagsSpy).toHaveBeenCalledWith('testValue');
  });

  it('should prevent default and emit event when input is a MouseEvent', () => {
    const event = new MouseEvent('click');
    const eventSpy = spyOn(event, 'preventDefault');
    const applyFiltersSpy = spyOn(component['_applyFilters'], 'emit');
    const tag = 'Tag 1';

    component.selectChip(event, tag);

    expect(eventSpy).toHaveBeenCalled();
    expect(applyFiltersSpy).toHaveBeenCalledWith({ event, tag });
  });

  it('should emit applyFilters event directly when input is a string', () => {
    const applyFiltersSpy = spyOn(component['_applyFilters'], 'emit');

    const event = 'Chip 1';
    component.selectChip(event);

    expect(applyFiltersSpy).toHaveBeenCalledWith({ event, tag: undefined });
  });

  it('should emit removeFilters event with isChipSelected when event is in chipsSelected', () => {
    component.chipsSelected = ['Chip 1'];
    const removeFiltersSpy = spyOn(component['_removeFilters'], 'emit');

    const event = component.chipsSelected[0];
    component.deselectChip(event);

    expect(removeFiltersSpy).toHaveBeenCalledWith({
      event,
      isChipSelected: true,
    });
  });

  it('should emit removeFilters event with isTagSelected when event is in tagsSelected', () => {
    component.chipsSelected = [];
    component.tagsSelected = ['Tag 1'];
    const removeFiltersSpy = spyOn(component['_removeFilters'], 'emit');

    const event = component.tagsSelected[0];
    component.deselectChip(event);

    expect(removeFiltersSpy).toHaveBeenCalledWith({
      event,
      isTagSelected: true,
    });
  });
});
