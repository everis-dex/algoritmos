import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationDataSectionComponent } from './general-information-data-section.component';

describe('GeneralInformationDataSectionComponent', () => {
  let component: GeneralInformationDataSectionComponent;
  let fixture: ComponentFixture<GeneralInformationDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralInformationDataSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInformationDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
