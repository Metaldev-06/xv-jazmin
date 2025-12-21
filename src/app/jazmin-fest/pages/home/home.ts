import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Address } from './components/address/address';
import { Countdown } from './components/countdown/countdown';
import { Hero } from './components/hero/hero';
import { StarEffect } from '../../../shared/components/star-effect/star-effect';
import { GiftComponent } from './components/gift/gift';
import { Invitation } from './components/invitation/invitation';

@Component({
  selector: 'app-home',
  imports: [Hero, Countdown, Address, GiftComponent, Invitation, StarEffect],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {}
