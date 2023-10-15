import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticleComponent } from './manage-article.component';

describe('ManageArticleComponent', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageArticleComponent]
    });
    fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
