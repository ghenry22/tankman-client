import { TestBed } from '@angular/core/testing';

import { TankmanApiService } from './tankman-api.service';

describe('TankmanApiService', () => {
  let service: TankmanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankmanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
