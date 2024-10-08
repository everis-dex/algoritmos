import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalInformationDataSectionComponent } from './technical-information-data-section.component';

describe('TechnicalInformationDataSectionComponent', () => {
  let component: TechnicalInformationDataSectionComponent;
  let fixture: ComponentFixture<TechnicalInformationDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalInformationDataSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalInformationDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
