import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { configureTestModule } from 'src/app/testing/config';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
