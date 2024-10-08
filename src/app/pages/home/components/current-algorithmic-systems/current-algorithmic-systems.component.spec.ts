import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAlgorithmicSystemsComponent } from './current-algorithmic-systems.component';

describe('CurrentAlgorithmicSystemsComponent', () => {
  let component: CurrentAlgorithmicSystemsComponent;
  let fixture: ComponentFixture<CurrentAlgorithmicSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAlgorithmicSystemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAlgorithmicSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
