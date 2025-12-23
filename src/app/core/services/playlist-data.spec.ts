import { TestBed } from '@angular/core/testing';

import { PlaylistData } from './playlist-data';

describe('PlaylistData', () => {
  let service: PlaylistData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
