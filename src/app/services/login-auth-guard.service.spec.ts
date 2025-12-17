import { TestBed } from '@angular/core/testing';
import { LoginAuthGuardService } from './login-auth-guard.service';
import { configureTestModule } from 'src/app/testing/config';

describe('LoginAuthGuardService', () => {
  let service: LoginAuthGuardService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(LoginAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
