import { TestBed } from '@angular/core/testing';
import { ViewService } from './view.service';
import { configureTestModule } from 'src/app/testing/config';

describe('ViewService', () => {
  let service: ViewService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(ViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
