import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCardsComponent } from './topic-cards.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';

describe('TopicCardsComponent', () => {
  let component: TopicCardsComponent;
  let fixture: ComponentFixture<TopicCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCardsComponent],
      providers: [provideHttpClient(), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
