import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAuth } from './business-auth';

describe('BusinessAuth', () => {
  let component: BusinessAuth;
  let fixture: ComponentFixture<BusinessAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAuth],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
