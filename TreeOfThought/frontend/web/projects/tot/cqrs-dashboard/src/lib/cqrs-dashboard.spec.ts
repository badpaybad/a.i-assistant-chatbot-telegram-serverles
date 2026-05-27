import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CqrsDashboard } from './cqrs-dashboard';

describe('CqrsDashboard', () => {
  let component: CqrsDashboard;
  let fixture: ComponentFixture<CqrsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CqrsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(CqrsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
