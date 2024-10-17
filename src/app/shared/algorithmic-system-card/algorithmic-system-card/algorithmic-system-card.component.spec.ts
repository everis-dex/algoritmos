import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicSystemCardComponent } from './algorithmic-system-card.component';

describe('AlgorithmicSystemCardComponent', () => {
  let component: AlgorithmicSystemCardComponent;
  let fixture: ComponentFixture<AlgorithmicSystemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmicSystemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmicSystemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
