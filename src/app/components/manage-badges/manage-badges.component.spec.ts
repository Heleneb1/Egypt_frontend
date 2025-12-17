import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { ManageBadgesComponent } from './manage-badges.component';

describe('ManageBadgeComponent', () => {
  let component: ManageBadgesComponent;
  let fixture: ComponentFixture<ManageBadgesComponent>;

  beforeEach(async () => {
    await configureTestModule([ManageBadgesComponent]),
      fixture = TestBed.createComponent(ManageBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

