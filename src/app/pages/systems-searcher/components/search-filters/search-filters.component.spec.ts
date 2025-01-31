import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFiltersComponent } from './search-filters.component';
import {
  ALGORITHMS,
  CATEGORIES,
  STATES,
} from '../../../../shared/constants/filters.const';
import { provideHttpClient } from '@angular/common/http';

describe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  const tags = [
    'Innovació',
    'Ètica digital',
    'Seguretat informàtica',
    'Anàlisi de dades',
    'Protecció de dades',
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFiltersComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.filterList = [
      {
        id: 0,
        name: component.filterList[0].name,
        chips: CATEGORIES,
        chipsSelected: [CATEGORIES[0]],
      },
      {
        id: 1,
        name: component.filterList[1].name,
        chips: [],
        chipsSelected: [tags[0]],
      },
      {
        id: 2,
        name: component.filterList[2].name,
        chips: STATES,
        chipsSelected: [STATES[0]],
      },
      {
        id: 3,
        name: component.filterList[3].name,
        chips: ALGORITHMS,
        chipsSelected: [ALGORITHMS[0]],
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('resetFilters', () => {
    it('should reset all filters', () => {
      component.resetFilters();

      expect(component.filterList).toEqual([
        {
          id: 0,
          name: component.filterList[0].name,
          chips: CATEGORIES,
          chipsSelected: [],
        },
        {
          id: 1,
          name: component.filterList[1].name,
          chips: [],
          chipsSelected: [],
        },
        {
          id: 2,
          name: component.filterList[2].name,
          chips: STATES,
          chipsSelected: [],
        },
        {
          id: 3,
          name: component.filterList[3].name,
          chips: ALGORITHMS,
          chipsSelected: [],
        },
      ]);
    });
  });

  describe('applyFilter', () => {
    it('should add a tag to chipsSelected if the tag is not already selected', () => {
      const index = 1;
      const event = new MouseEvent('click');
      const tag = tags[1];
      component.applyFilter({ index, event, tag });

      expect(component.filterList).toEqual([
        {
          id: 0,
          name: component.filterList[0].name,
          chips: CATEGORIES,
          chipsSelected: [CATEGORIES[0]],
        },
        {
          id: 1,
          name: component.filterList[1].name,
          chips: [],
          chipsSelected: [tags[0], tags[1]],
        },
        {
          id: 2,
          name: component.filterList[2].name,
          chips: STATES,
          chipsSelected: [STATES[0]],
        },
        {
          id: 3,
          name: component.filterList[3].name,
          chips: ALGORITHMS,
          chipsSelected: [ALGORITHMS[0]],
        },
      ]);
    });

    it('should not add a tag to chipsSelected if the tag is already selected', () => {
      const index = 1;
      const event = new MouseEvent('click');
      const tag = tags[0];
      component.applyFilter({ index, event, tag });

      expect(component.filterList).toEqual([
        {
          id: 0,
          name: component.filterList[0].name,
          chips: CATEGORIES,
          chipsSelected: [CATEGORIES[0]],
        },
        {
          id: 1,
          name: component.filterList[1].name,
          chips: [],
          chipsSelected: [tags[0]],
        },
        {
          id: 2,
          name: component.filterList[2].name,
          chips: STATES,
          chipsSelected: [STATES[0]],
        },
        {
          id: 3,
          name: component.filterList[3].name,
          chips: ALGORITHMS,
          chipsSelected: [ALGORITHMS[0]],
        },
      ]);
    });

    it('should add a chip to chipsSelected when event is a string', () => {
      const index = 2;
      const event = STATES[1];
      component.applyFilter({ index, event });

      expect(component.filterList).toEqual([
        {
          id: 0,
          name: component.filterList[0].name,
          chips: CATEGORIES,
          chipsSelected: [CATEGORIES[0]],
        },
        {
          id: 1,
          name: component.filterList[1].name,
          chips: [],
          chipsSelected: [tags[0]],
        },
        {
          id: 2,
          name: component.filterList[2].name,
          chips: STATES,
          chipsSelected: [STATES[1]],
        },
        {
          id: 3,
          name: component.filterList[3].name,
          chips: ALGORITHMS,
          chipsSelected: [ALGORITHMS[0]],
        },
      ]);
    });
  });

  describe('removeFilter', () => {
    it('should remove the event from chipsSelected', () => {
      const index = 0;
      component.removeFilter({ index, event: CATEGORIES[0] });

      expect(component.filterList).toEqual([
        {
          id: 0,
          name: component.filterList[0].name,
          chips: CATEGORIES,
          chipsSelected: [],
        },
        {
          id: 1,
          name: component.filterList[1].name,
          chips: [],
          chipsSelected: [tags[0]],
        },
        {
          id: 2,
          name: component.filterList[2].name,
          chips: STATES,
          chipsSelected: [STATES[0]],
        },
        {
          id: 3,
          name: component.filterList[3].name,
          chips: ALGORITHMS,
          chipsSelected: [ALGORITHMS[0]],
        },
      ]);
    });
  });
});
