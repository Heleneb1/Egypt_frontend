import { TestBed } from '@angular/core/testing';
import { SendEmailService } from './send-email.service';
import { configureTestModule } from 'src/app/testing/config';

describe('SendEmailService', () => {
  let service: SendEmailService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(SendEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
