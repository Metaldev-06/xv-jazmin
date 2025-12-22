import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Address } from './components/address/address';
import { Countdown } from './components/countdown/countdown';
import { Farewell } from './components/farewell/farewell';
import { GiftComponent } from './components/gift/gift';
import { Hero } from './components/hero/hero';
import { ImagesGrid } from './components/images-grid/images-grid';
import { Invitation } from './components/invitation/invitation';
import { StarEffect } from '../../../shared/components/star-effect/star-effect';

@Component({
  selector: 'app-home',
  imports: [StarEffect, Hero, Countdown, Address, GiftComponent, Invitation, ImagesGrid, Farewell],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {}
