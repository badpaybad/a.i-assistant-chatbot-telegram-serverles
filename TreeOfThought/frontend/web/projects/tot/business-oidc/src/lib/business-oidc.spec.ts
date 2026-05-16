import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOidc } from './business-oidc';

describe('BusinessOidc', () => {
  let component: BusinessOidc;
  let fixture: ComponentFixture<BusinessOidc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessOidc],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessOidc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
