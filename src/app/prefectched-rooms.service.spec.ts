import { TestBed } from '@angular/core/testing';

import { PrefectchedRoomsService } from './prefectched-rooms.service';

describe('PrefectchedRoomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrefectchedRoomsService = TestBed.get(PrefectchedRoomsService);
    expect(service).toBeTruthy();
  });
});
