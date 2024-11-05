import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersComponent } from './search-filters.component';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset filters', () => {
    component.resetFilters();

    expect(component.chipsSelected.length).toBe(0);
    expect(component.tagsSelected.length).toBe(0);
  });

  it('should apply filters when MouseEvent is triggered and tags array is empty', () => {
    component.tagsSelected = [];

    const event = new MouseEvent('click');
    const tag = 'Tag 1';
    component.applyFilters({ event, tag });

    expect(component.tagsSelected).toEqual([tag]);
  });

  it('should not apply filters when the same tag is selected', () => {
    component.tagsSelected = ['Tag 1'];

    const event = new MouseEvent('click');
    const tag = 'Tag 1';
    component.applyFilters({ event, tag });

    expect(component.tagsSelected).toEqual([tag]);
  });

  it('should apply filters when event contains a string', () => {
    component.chipsSelected = [];

    const event = 'Chip 1';
    component.applyFilters({ event });

    expect(component.chipsSelected).toEqual([event]);
  });

  it('should remove filters when a chip is selected', () => {
    component.chipsSelected = ['Chip 1', 'Chip 2', 'Chip 3'];

    const event = 'Chip 1';
    component.removeFilters({ event, isChipSelected: true });

    expect(component.chipsSelected).toEqual(['Chip 2', 'Chip 3']);
  });

  it('should remove filters when a tag is selected', () => {
    component.tagsSelected = ['Tag 1', 'Tag 2', 'Tag 3'];

    const event = 'Tag 1';
    component.removeFilters({ event, isTagSelected: true });

    expect(component.tagsSelected).toEqual(['Tag 2', 'Tag 3']);
  });
});
