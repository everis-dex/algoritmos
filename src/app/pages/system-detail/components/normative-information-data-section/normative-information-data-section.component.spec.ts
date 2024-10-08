import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativeInformationDataSectionComponent } from './normative-information-data-section.component';

describe('NormativeInformationDataSectionComponent', () => {
  let component: NormativeInformationDataSectionComponent;
  let fixture: ComponentFixture<NormativeInformationDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormativeInformationDataSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormativeInformationDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
