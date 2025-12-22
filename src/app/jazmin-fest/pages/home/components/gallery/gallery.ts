import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideAngularModule, Instagram, ArrowUpFromLine } from 'lucide-angular';

@Component({
  selector: 'app-gallery',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  readonly InstagramIcon = Instagram;
  readonly ArrowUpFromLineIcon = ArrowUpFromLine;

  public date = new Date('2026-01-24T21:00:00-03:00');

  isTodayOrAfter(compareDate: Date | string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateToCompare = new Date(compareDate);
    dateToCompare.setHours(0, 0, 0, 0);

    return today.getTime() >= dateToCompare.getTime();
  }
}
