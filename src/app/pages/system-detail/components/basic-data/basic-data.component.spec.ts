import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataComponent } from './basic-data.component';
import { provideHttpClient } from '@angular/common/http';

describe('BasicDataComponent', () => {
  let component: BasicDataComponent;
  let fixture: ComponentFixture<BasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDataComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(BasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
