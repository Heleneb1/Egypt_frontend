import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBadgesComponent } from './manage-badges.component';

describe('ManageBadgesComponent', () => {
  let component: ManageBadgesComponent;
  let fixture: ComponentFixture<ManageBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBadgesComponent]
    });
    fixture = TestBed.createComponent(ManageBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
