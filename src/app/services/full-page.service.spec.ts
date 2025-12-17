import { TestBed } from '@angular/core/testing';
import { FullPageService } from './full-page.service';
import { configureTestModule } from 'src/app/testing/config';

describe('FullPageService', () => {
  let service: FullPageService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(FullPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
