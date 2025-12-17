import { TestBed } from '@angular/core/testing';
import { BadgesService } from './badges.service';
import { configureTestModule } from 'src/app/testing/config';

describe('BadgesService', () => {
  let service: BadgesService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(BadgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
