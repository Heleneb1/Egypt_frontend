import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizViewComponent } from './quiz-view.component';

describe('QuizViewComponent', () => {
  let component: QuizViewComponent;
  let fixture: ComponentFixture<QuizViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizViewComponent]
    });
    fixture = TestBed.createComponent(QuizViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
