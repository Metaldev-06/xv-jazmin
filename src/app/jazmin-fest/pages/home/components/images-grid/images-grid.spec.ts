import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesGrid } from './images-grid';

describe('ImagesGrid', () => {
  let component: ImagesGrid;
  let fixture: ComponentFixture<ImagesGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
