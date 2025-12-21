import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarEffect } from './star-effect';

describe('StarEffect', () => {
  let component: StarEffect;
  let fixture: ComponentFixture<StarEffect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarEffect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarEffect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
