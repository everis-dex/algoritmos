import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';
import { CATEGORIES, STATES } from '../../constants/filters.const';
import { IFilterData } from './accordion.model';
import { ITabData } from '../../../pages/system-detail/components/tabs-data/tabs-data.model';
import { TABS_DATA } from '../../../pages/system-detail/components/tabs-data/tabs-data.config';
import { provideHttpClient } from '@angular/common/http';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.tags = [
      'Innovació',
      'Ètica digital',
      'Seguretat informàtica',
      'Anàlisi de dades',
      'Protecció de dades',
    ];
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

  describe('isFilter', () => {
    it('should return true if the item is of type IFilterData', () => {
      const item: IFilterData = {
        id: 0,
        name: 'Categoria',
        chips: CATEGORIES,
        chipsSelected: [],
      };
      const accordionDataResult = component.isFilter(item);
      expect(accordionDataResult).toBeTrue();
    });
  });

  describe('isTab', () => {
    it('should return true if the item is of type ITabData', () => {
      const item: ITabData = TABS_DATA[0];
      const tabDataResult = component.isTab(item);
      expect(tabDataResult).toBeTrue();
    });
  });

  describe('getChipsSelected', () => {
    it('should get chips selected correctly', () => {
      const item: IFilterData = {
        id: 0,
        name: 'Categoría',
        chips: CATEGORIES,
        chipsSelected: [CATEGORIES[0], CATEGORIES[1]],
      };
      const chipsSelected = component.getChipsSelected(item);
      expect(chipsSelected).toEqual(item.chipsSelected);
    });
  });

  describe('areTagsSelected', () => {
    it('should return true if the selected item is a tag and has selected chips', () => {
      const item: IFilterData = {
        id: 1,
        name: 'Etiquetes',
        chips: [],
        chipsSelected: [component.tags[0]],
      };
      const tagsSelected = component.areTagsSelected(item);
      expect(tagsSelected).toBeTrue();
    });

    it('should return false if the selected item is not a tag', () => {
      const item: IFilterData = {
        id: 0,
        name: 'Categories',
        chips: CATEGORIES,
        chipsSelected: [CATEGORIES[0]],
      };
      const tagsSelected = component.areTagsSelected(item);
      expect(tagsSelected).toBeFalse();
    });
  });

  describe('filterTags', () => {
    it('should reset tags if input value is not provided', () => {
      component.filterTags();

      expect(component.hasInputValue).toBeFalse();
      expect(component.filteredTags).toEqual(component.tags);
    });

    it('should prioritize tags that start with the input value "da" and sort the remaining matches', () => {
      component.tags = [...component.tags, 'Dades personals'];
      const inputValue = 'da';
      component.filterTags(inputValue);

      expect(component.filteredTags).toEqual([
        'Dades personals',
        'Anàlisi de dades',
        'Protecció de dades',
      ]);
    });

    it('should prioritize and sort tags correctly when multiple tags start with the input value "se"', () => {
      component.tags = [...component.tags, 'Seguretat de la informació'];
      const inputValue = 'se';
      component.filterTags(inputValue);

      expect(component.filteredTags).toEqual([
        'Seguretat de la informació',
        'Seguretat informàtica',
      ]);
    });
  });

  describe('toggle', () => {
    it('should toggle the accordion to display it and rotate the icon', () => {
      const accordionId = 1;
      component.toggleState[accordionId] = { display: false };
      component.toggle(accordionId);

      expect(component.toggleState[accordionId]).toEqual({
        display: true,
      });
    });

    it('should call filterTags when the accordion with input value is toggled', () => {
      const filterTagsSpy = spyOn(component, 'filterTags');
      component.hasInputValue = true;

      const index = 1;
      component.toggle(index);

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
      const index = 1;
      const event = new MouseEvent('click');
      const applyFilterSpy = spyOn(component['_applyFilter'], 'emit');
      const tag = 'Tag 1';

      component.tags = [tag];
      component.selectChip(index, event, tag);

      expect(applyFilterSpy).toHaveBeenCalledWith({ index, tag });
    });

    it('should not emit or prevent default if tag is not in tags list', () => {
      const index = 1;
      const event = new MouseEvent('click');
      const tag = 'Tag 3';

      component.tags = ['Tag 1', 'Tag 2'];
      component.selectChip(index, event, tag);
    });

    it('should emit applyFilter event directly when input is a string', () => {
      const applyFilterSpy = spyOn(component['_applyFilter'], 'emit');

      const index = 1;
      const event = 'Chip 1';
      component.selectChip(index, event);

      expect(applyFilterSpy).toHaveBeenCalledWith({ index, event });
    });
  });

  describe('deselectChip', () => {
    it('should emit removeFilter event when a chip is deselected', () => {
      const removeFilterSpy = spyOn(component['_removeFilter'], 'emit');

      const item: IFilterData = {
        id: 2,
        name: 'Estats',
        chips: STATES,
        chipsSelected: [STATES[0]],
      };
      const event = item.chipsSelected[0];
      component.deselectChip(item, event);

      expect(removeFilterSpy).toHaveBeenCalledWith({ index: item.id, event });
    });
  });
});
