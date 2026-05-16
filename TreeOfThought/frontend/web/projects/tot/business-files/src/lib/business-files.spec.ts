import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFiles } from './business-files';

describe('BusinessFiles', () => {
  let component: BusinessFiles;
  let fixture: ComponentFixture<BusinessFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessFiles],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessFiles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
