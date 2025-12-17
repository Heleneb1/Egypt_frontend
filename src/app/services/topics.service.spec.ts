import { TestBed } from '@angular/core/testing';
import { TopicsService } from './topics.service';
import { configureTestModule } from 'src/app/testing/config';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(TopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
