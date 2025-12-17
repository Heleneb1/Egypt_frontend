import { TestBed } from '@angular/core/testing';
import { AdminGuardService } from './admin-guard.service';
import { configureTestModule } from 'src/app/testing/config';

describe('AdminGuardService', () => {
  let service: AdminGuardService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(AdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
