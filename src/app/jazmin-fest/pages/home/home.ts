import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Address } from './components/address/address';
import { Countdown } from './components/countdown/countdown';
import { GiftComponent } from './components/gift/gift';
import { Hero } from './components/hero/hero';
import { Invitation } from './components/invitation/invitation';
import { StarEffect } from '../../../shared/components/star-effect/star-effect';

@Component({
  selector: 'app-home',
  imports: [Hero, Countdown, Address, GiftComponent, Invitation, StarEffect],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {}
