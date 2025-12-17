import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { ManageArticleComponent } from './manage-article.component';

describe('ManageArticleComponent', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(async () => {
    await configureTestModule([ManageArticleComponent]),
      fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

