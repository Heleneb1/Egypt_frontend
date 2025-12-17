import { TestBed } from '@angular/core/testing';
import { SlugService } from './slug.service';
import { configureTestModule } from 'src/app/testing/config';

describe('SlugService', () => {
  let service: SlugService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(SlugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
