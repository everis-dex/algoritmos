import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestTopicsCardsComponent } from './interest-topics-cards.component';

describe('InterestTopicsCardsComponent', () => {
  let component: InterestTopicsCardsComponent;
  let fixture: ComponentFixture<InterestTopicsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestTopicsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestTopicsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
