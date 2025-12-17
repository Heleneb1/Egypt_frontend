import { TestBed } from '@angular/core/testing';
import { ArticlesService } from './articles.service';
import { configureTestModule } from 'src/app/testing/config';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(ArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
