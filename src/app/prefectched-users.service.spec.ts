import { TestBed } from '@angular/core/testing';

import { PrefectchedUsersService } from './prefectched-users.service';

describe('PrefectchedUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrefectchedUsersService = TestBed.get(PrefectchedUsersService);
    expect(service).toBeTruthy();
  });
});
