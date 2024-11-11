import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsSearcherComponent } from './systems-searcher.component';

describe('SystemsSearcherComponent', () => {
  let component: SystemsSearcherComponent;
  let fixture: ComponentFixture<SystemsSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsSearcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeView', () => {
    it('should emit the view string when changeView is called', () => {
      const emitSpy = spyOn(component['_changeView'], 'emit');
      const testView = 'test-view';

      component.changeView(testView);

      expect(emitSpy).toHaveBeenCalledWith(testView);
    });
  });

  describe('setHeader', () => {
    it('should emit the header name when setHeader is called', () => {
      const emitSpy = spyOn(component['_setHeader'], 'emit');
      const testHeader = 'test-header';

      component.setHeader(testHeader);

      expect(emitSpy).toHaveBeenCalledWith(testHeader);
    });

    it('should emit empty string when setHeader is called with empty string', () => {
      const emitSpy = spyOn(component['_setHeader'], 'emit');

      component.setHeader('');

      expect(emitSpy).toHaveBeenCalledWith('');
    });
  });

  it('should change the page and scroll the window to the top', () => {
    const windowSpy = spyOn(window, 'scrollTo');

    const page = 2;
    component.changePage(page);

    expect(windowSpy).toHaveBeenCalled();
  });

  it('should update filter list correctly', () => {
    const updatedFilterList = [
      { filter: 'Filter 1', optionsSelected: ['Option 1', 'Option 2'] },
      { filter: 'Filter 2', optionsSelected: ['Option 3'] },
      { filter: 'Filter 3', optionsSelected: [] },
    ];
    component.filtersApplied(updatedFilterList);

    expect(component.filterList).toEqual(updatedFilterList);
  });
});
