import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTest } from './business-test';

describe('BusinessTest', () => {
  let component: BusinessTest;
  let fixture: ComponentFixture<BusinessTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTest],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
