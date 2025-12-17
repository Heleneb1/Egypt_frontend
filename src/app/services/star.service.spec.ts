import { TestBed } from '@angular/core/testing';
import { StarService } from './star.service';
import { configureTestModule } from 'src/app/testing/config';

describe('StarService', () => {
  let service: StarService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(StarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
