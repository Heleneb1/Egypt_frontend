import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { CreateQuizComponent } from './create-quiz.component';

describe('CreateQuizComponent', () => {
  let component: CreateQuizComponent;
  let fixture: ComponentFixture<CreateQuizComponent>;

  beforeEach(async () => {
    await configureTestModule([CreateQuizComponent]),
      fixture = TestBed.createComponent(CreateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

