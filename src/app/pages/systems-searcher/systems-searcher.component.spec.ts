import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsSearcherComponent } from './systems-searcher.component';

describe('SystemsSearcherComponent', () => {
  let component: SystemsSearcherComponent;
  let fixture: ComponentFixture<SystemsSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemsSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
