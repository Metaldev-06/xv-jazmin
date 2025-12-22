import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-jazmin-fest',
  imports: [RouterOutlet, Footer],
  templateUrl: './jazmin-fest.html',
  styleUrl: './jazmin-fest.css',
})
export default class JazminFest {}
