import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsSearcherComponent } from './systems-searcher.component';

describe('SystemsSearcherComponent', () => {
  let component: SystemsSearcherComponent;
  let fixture: ComponentFixture<SystemsSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsSearcherComponent]
    })
    .compileComponents();

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
});
