import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { ManageQuestionComponent } from './manage-question.component';

describe('ManageQuestionComponent', () => {
  let component: ManageQuestionComponent;
  let fixture: ComponentFixture<ManageQuestionComponent>;

  beforeEach(async () => {
    await configureTestModule([ManageQuestionComponent]),
      fixture = TestBed.createComponent(ManageQuestionComponent);
    component = fixture.componentInstance;
    component.questions = [];
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

