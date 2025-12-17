import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { Logo3DComponent } from './logo3-d.component';

describe('Logo3DComponent', () => {
  let component: Logo3DComponent;
  let fixture: ComponentFixture<Logo3DComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Logo3DComponent]
    });
    fixture = TestBed.createComponent(Logo3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
