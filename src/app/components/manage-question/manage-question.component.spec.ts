import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuestionComponent } from './manage-question.component';

describe('ManageQuestionComponent', () => {
  let component: ManageQuestionComponent;
  let fixture: ComponentFixture<ManageQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageQuestionComponent]
    });
    fixture = TestBed.createComponent(ManageQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
