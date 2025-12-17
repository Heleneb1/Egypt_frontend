import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { ArticlesCarouselComponent } from './articles-carousel.component';

describe('ArticlesCarouselComponent', () => {
  let component: ArticlesCarouselComponent;
  let fixture: ComponentFixture<ArticlesCarouselComponent>;

  beforeEach(async () => {
    await configureTestModule([ArticlesCarouselComponent]),
      fixture = TestBed.createComponent(ArticlesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

