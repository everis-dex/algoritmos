import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsSearcherLinkComponent } from './systems-searcher-link.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';

describe('SystemsSearcherLinkComponent', () => {
  let component: SystemsSearcherLinkComponent;
  let fixture: ComponentFixture<SystemsSearcherLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsSearcherLinkComponent],
      providers: [provideHttpClient(), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemsSearcherLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeView event', () => {
    const changeViewSpy = spyOn(component['_changeView'], 'emit');

    component.redirectToSystemsSearcherView();

    expect(changeViewSpy).toHaveBeenCalled();
  });
});
