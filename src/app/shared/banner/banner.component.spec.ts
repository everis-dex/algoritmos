import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { provideHttpClient } from '@angular/common/http';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeView event', () => {
    const changeViewSpy = spyOn(component['_changeView'], 'emit');

    const event = new Event('click');
    component.redirectToHomeView(event);

    expect(changeViewSpy).toHaveBeenCalled();
  });
});
