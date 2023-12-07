import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesModalComponent } from './badges-modal.component';

describe('BadgesModalComponent', () => {
  let component: BadgesModalComponent;
  let fixture: ComponentFixture<BadgesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgesModalComponent]
    });
    fixture = TestBed.createComponent(BadgesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
