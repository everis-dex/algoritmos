import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsSearcherLinkComponent } from './systems-searcher-link.component';

describe('SystemsSearcherLinkComponent', () => {
  let component: SystemsSearcherLinkComponent;
  let fixture: ComponentFixture<SystemsSearcherLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsSearcherLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemsSearcherLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to systems searcher view', () => {
    const viewManagerSpy = spyOn(component['_viewManagerService'], 'setView');

    component.redirectToSystemsSearcherView();

    expect(viewManagerSpy).toHaveBeenCalledWith('systems-searcher');
  });
});
