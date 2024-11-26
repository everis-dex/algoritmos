import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInformationCardComponent } from './more-information-card.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';

describe('MoreInformationCardComponent', () => {
  let component: MoreInformationCardComponent;
  let fixture: ComponentFixture<MoreInformationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreInformationCardComponent],
      providers: [provideHttpClient(), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(MoreInformationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
