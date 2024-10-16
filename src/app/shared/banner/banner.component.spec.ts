import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the official page home', () => {
    let currentLocation = '';
    component['_window'] = {
      location: {
        set href(value: string) {
          currentLocation = value;
        },
      },
    } as Window & typeof globalThis;

    component.redirectToIniciPage();

    expect(currentLocation).toBe(
      'https://administraciodigital.gencat.cat/ca/inici/'
    );
  });

  it('should emit changeView event', () => {
    const changeViewSpy = spyOn(component['_changeView'], 'emit');

    component.redirectToHomeView();

    expect(changeViewSpy).toHaveBeenCalled();
  });
});
