import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { ManageCommentsComponent } from './manage-comments.component';

describe('ManageCommentsComponent', () => {
  let component: ManageCommentsComponent;
  let fixture: ComponentFixture<ManageCommentsComponent>;

  beforeEach(async () => {
    await configureTestModule([ManageCommentsComponent]),
      fixture = TestBed.createComponent(ManageCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

