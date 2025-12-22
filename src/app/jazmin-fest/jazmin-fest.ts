import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';
import { StarEffect } from '../shared/components/star-effect/star-effect';

@Component({
  selector: 'app-jazmin-fest',
  imports: [RouterOutlet, Footer, StarEffect],
  templateUrl: './jazmin-fest.html',
  styleUrl: './jazmin-fest.css',
})
export default class JazminFest {}
