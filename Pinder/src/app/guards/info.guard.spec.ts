import { TestBed, async, inject } from '@angular/core/testing';

import { InfoGuard } from './info.guard';

describe('InfoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoGuard]
    });
  });

  it('should ...', inject([InfoGuard], (guard: InfoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
