import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';
import { CATEGORIES, TAGS } from '../../constants/search-filters.const';
import { IAccordionData } from './accordion.model';
import { ITabData } from '../../pages/system-detail/components/tabs-data/tabs-data.model';
import { tabsData } from '../../pages/system-detail/components/tabs-data/tabs-data.config';

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

  describe('isAccordionData', () => {
    it('should return true if the item is of type IAccordionData', () => {
      const item: IAccordionData = {
        id: 1,
        name: 'Categoria',
        chips: CATEGORIES,
      };
      const accordionDataResult = component.isAccordionData(item);
      expect(accordionDataResult).toBeTrue();
    });
  });

  describe('isTabData', () => {
    it('should return true if the item is of type ITabData', () => {
      const item: ITabData = tabsData[0];
      const tabDataResult = component.isTabData(item);
      expect(tabDataResult).toBeTrue();
    });
  });

  describe('getOptionsSelected', () => {
    it('should get options selected correctly', () => {
      component.filterList = [
        { filter: 'Filter 1', optionsSelected: ['Option 1', 'Option 2'] },
        { filter: 'Filter 2', optionsSelected: ['Option 3'] },
        { filter: 'Filter 3', optionsSelected: [] },
      ];

      const index = 1;
      const optionsSelected = component.getOptionsSelected(index);
      expect(optionsSelected).toEqual(['Option 1', 'Option 2']);
    });
  });

  describe('filterTags', () => {
    it('should reset tags if input value is not provided', () => {
      component.filterTags();

      expect(component.hasInputValue).toBeFalse();
      expect(component.filteredTags).toEqual(TAGS);
    });

    it('should filter and sort tags with input value matching the start of tags', () => {
      component.tags = [...component.tags, 'Seguretat de la informació'];
      const inputValue = 'se';
      component.filterTags(inputValue);

      expect(component.filteredTags).toEqual([
        'Seguretat informàtica',
        'Seguretat de la informació',
      ]);
    });

    it('should filter tags with input value matching inside tags', () => {
      const inputValue = 'da';
      component.filterTags(inputValue);

      expect(component.filteredTags).toEqual([
        'Anàlisi de dades',
        'Protecció de dades',
      ]);
    });
  });

  describe('toggle', () => {
    it('should toggle the accordion to display it and rotate the icon', () => {
      const accordionId = 1;
      component.toggleStates[accordionId] = { display: false, rotation: false };
      component.toggle(accordionId);

      expect(component.toggleStates[accordionId]).toEqual({
        display: true,
        rotation: true,
      });
    });

    it('should call filterTags when the accordion with input value is toggled', () => {
      const filterTagsSpy = spyOn(component, 'filterTags');
      component.hasInputValue = true;

      const accordionId = 2;
      component.toggle(accordionId);

      expect(filterTagsSpy).toHaveBeenCalled();
    });
  });

  describe('handleTagSelect', () => {
    it('should disable rotation on tag select', () => {
      const filterTagsSpy = spyOn(component, 'filterTags');

      component.hasInputValue = true;
      component.isSelectorRotated = true;

      component.handleTagSelect();

      expect(filterTagsSpy).toHaveBeenCalled();
      expect(component.isSelectorRotated).toBeFalse();
    });
  });

  describe('handleInput', () => {
    it('should handle search input correctly', () => {
      const filterTagsSpy = spyOn(component, 'filterTags');
      const event = new KeyboardEvent('input', { key: 'Enter' });
      const inputElement = document.createElement('input');
      inputElement.value = 'testValue';

      Object.defineProperty(event, 'target', { value: inputElement });

      component.handleInput(event);

      expect(component.hasInputValue).toBeTrue();
      expect(filterTagsSpy).toHaveBeenCalledWith('testValue');
    });
  });

  describe('selectChip', () => {
    it('should prevent default and emit event when input is a MouseEvent', () => {
      const event = new MouseEvent('click');
      const applyFiltersSpy = spyOn(component['_applyFilters'], 'emit');
      const tag = 'Tag 1';

      component.tags = [tag];
      component.selectChip(event, tag);

      expect(applyFiltersSpy).toHaveBeenCalledWith({ event, tag });
    });

    it('should not emit or prevent default if tag is not in tags list', () => {
      const event = new MouseEvent('click');
      const tag = 'Tag 3';

      component.tags = ['Tag 1', 'Tag 2'];
      component.selectChip(event, tag);
    });

    it('should emit applyFilters event directly when input is a string', () => {
      const applyFiltersSpy = spyOn(component['_applyFilters'], 'emit');

      const event = 'Chip 1';
      component.selectChip(event);

      expect(applyFiltersSpy).toHaveBeenCalledWith({ event });
    });
  });

  describe('deselectChip', () => {
    it('should emit removeFilters event when a chip is deselected', () => {
      component.filterList = [
        { filter: 'Filter 1', optionsSelected: ['Option 1', 'Option 2'] },
        { filter: 'Filter 2', optionsSelected: ['Option 3'] },
        { filter: 'Filter 3', optionsSelected: [] },
      ];

      const removeFiltersSpy = spyOn(component['_removeFilters'], 'emit');

      const event = 'Chip 1';
      const index = 3;
      component.deselectChip(event, index);

      expect(removeFiltersSpy).toHaveBeenCalledWith(event);
      expect(component.hasTagsSelected).toBeFalse();
    });
  });
});
