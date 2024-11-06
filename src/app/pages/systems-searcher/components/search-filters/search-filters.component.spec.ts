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

    component.filterList = [
      { filter: 'Filter 1', optionsSelected: ['Option 1', 'Option 2'] },
      { filter: 'Filter 2', optionsSelected: ['Option 3'] },
      { filter: 'Filter 3', optionsSelected: [] },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset filters', () => {
    component.resetFilters();

    expect(component.filterList).toEqual([
      { filter: 'Categoria', optionsSelected: [] },
      { filter: 'Etiquetes', optionsSelected: [] },
      { filter: 'Estats', optionsSelected: [] },
      { filter: "Tipus d'algorisme", optionsSelected: [] },
    ]);
  });

  it('should add a new option if it does not already exist in optionsSelected (with MouseEvent and tag)', () => {
    const event = new MouseEvent('click');
    const tag = 'Option 4';
    component.applyFilters({ event, tag });
  });

  it('should apply filters when event is a string without tag', () => {
    const event = 'Option 4';
    component.applyFilters({ event });
  });

  it('should remove the event from optionsSelected', () => {
    component.removeFilters('Option 1');

    expect(component.filterList).toEqual([
      { filter: 'Filter 1', optionsSelected: ['Option 2'] },
      { filter: 'Filter 2', optionsSelected: ['Option 3'] },
      { filter: 'Filter 3', optionsSelected: [] },
    ]);
  });

  it('should not modify filterList if the event is not found', () => {
    component.removeFilters('Option 4');

    expect(component.filterList).toEqual([
      { filter: 'Filter 1', optionsSelected: ['Option 1', 'Option 2'] },
      { filter: 'Filter 2', optionsSelected: ['Option 3'] },
      { filter: 'Filter 3', optionsSelected: [] },
    ]);
  });
});
