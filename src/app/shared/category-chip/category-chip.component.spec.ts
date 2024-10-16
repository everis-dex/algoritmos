import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChipComponent } from './category-chip.component';

describe('CategoryChipComponent', () => {
  let component: CategoryChipComponent;
  let fixture: ComponentFixture<CategoryChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectCategory event', () => {
    const changeViewSpy = spyOn(
      Object.getOwnPropertyDescriptor(component, '_selectCategory')!.value,
      'emit'
    );

    component.selectCategory();

    expect(changeViewSpy).toHaveBeenCalled();
  });
});
