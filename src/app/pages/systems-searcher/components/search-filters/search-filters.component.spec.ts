import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFiltersComponent } from './search-filters.component';
import {
  ALGORITHMS,
  CATEGORIES,
  STATES,
  TAGS,
} from '../../../../constants/search-filters.const';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.filterList = [
      {
        filter: component.filters[0].name,
        optionsSelected: [CATEGORIES[0], CATEGORIES[1]],
      },
      { filter: component.filters[1].name, optionsSelected: [TAGS[0]] },
      { filter: component.filters[2].name, optionsSelected: [] },
      { filter: component.filters[3].name, optionsSelected: [ALGORITHMS[0]] },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset all filters', () => {
    component.resetFilters();

    expect(component.filterList).toEqual([
      { filter: component.filters[0].name, optionsSelected: [] },
      { filter: component.filters[1].name, optionsSelected: [] },
      { filter: component.filters[2].name, optionsSelected: [] },
      { filter: component.filters[3].name, optionsSelected: [] },
    ]);
  });

  it('should reset the filter for the provided id', () => {
    const index = 3;
    component.resetFilters(index);

    expect(component.filterList).toEqual([
      {
        filter: component.filters[0].name,
        optionsSelected: [CATEGORIES[0], CATEGORIES[1]],
      },
      { filter: component.filters[1].name, optionsSelected: [TAGS[0]] },
      { filter: component.filters[2].name, optionsSelected: [] },
      { filter: component.filters[3].name, optionsSelected: [] },
    ]);
  });

  it('should call resetFilters if index is greater than or equal to TAGS_ID in _addNewOptionSelected', () => {
    const resetFiltersSpy = spyOn(component, 'resetFilters');

    const index = 3;
    const option = TAGS[1];
    component['_addNewOptionSelected'](option, index);

    expect(resetFiltersSpy).toHaveBeenCalledWith(index);
  });

  it('should add a new option to optionsSelected when tag is provided', () => {
    const event = new MouseEvent('click');
    const tag = TAGS[1];
    component.applyFilters({ event, tag });

    expect(component.filterList).toEqual([
      {
        filter: component.filters[0].name,
        optionsSelected: [CATEGORIES[0], CATEGORIES[1]],
      },
      {
        filter: component.filters[1].name,
        optionsSelected: [TAGS[0], TAGS[1]],
      },
      { filter: component.filters[2].name, optionsSelected: [] },
      { filter: component.filters[3].name, optionsSelected: [ALGORITHMS[0]] },
    ]);
  });

  it('should add a new option to optionsSelected when event is a string', () => {
    const event = STATES[0];
    component.applyFilters({ event });

    expect(component.filterList).toEqual([
      {
        filter: component.filters[0].name,
        optionsSelected: [CATEGORIES[0], CATEGORIES[1]],
      },
      { filter: component.filters[1].name, optionsSelected: [TAGS[0]] },
      { filter: component.filters[2].name, optionsSelected: [STATES[0]] },
      { filter: component.filters[3].name, optionsSelected: [ALGORITHMS[0]] },
    ]);
  });

  it('should remove the event from optionsSelected', () => {
    component.removeFilters(CATEGORIES[0]);

    expect(component.filterList).toEqual([
      { filter: component.filters[0].name, optionsSelected: [CATEGORIES[1]] },
      { filter: component.filters[1].name, optionsSelected: [TAGS[0]] },
      { filter: component.filters[2].name, optionsSelected: [] },
      { filter: component.filters[3].name, optionsSelected: [ALGORITHMS[0]] },
    ]);
  });

  it('should not modify filterList if the event is not found', () => {
    component.removeFilters(ALGORITHMS[0]);

    expect(component.filterList).toEqual([
      {
        filter: component.filters[0].name,
        optionsSelected: [CATEGORIES[0], CATEGORIES[1]],
      },
      { filter: component.filters[1].name, optionsSelected: [TAGS[0]] },
      { filter: component.filters[2].name, optionsSelected: [] },
      { filter: component.filters[3].name, optionsSelected: [] },
    ]);
  });
});
