import { ComponentFixture, TestBed } from '@angular/core/testing';

import { configureTestModule } from 'src/app/testing/config';
import { QuizDetailsComponent } from './quiz-details.component';

describe('QuizDetailsComponent', () => {
  let component: QuizDetailsComponent;
  let fixture: ComponentFixture<QuizDetailsComponent>;

  beforeEach(async () => {
    await configureTestModule([QuizDetailsComponent]);
    fixture = TestBed.createComponent(QuizDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
