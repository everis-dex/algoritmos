import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCardsComponent } from './topic-cards.component';
import { provideHttpClient } from '@angular/common/http';

describe('TopicCardsComponent', () => {
  let component: TopicCardsComponent;
  let fixture: ComponentFixture<TopicCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCardsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
