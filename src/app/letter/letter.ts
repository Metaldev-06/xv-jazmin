import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StarEffect } from '../shared/components/star-effect/star-effect';

@Component({
  selector: 'app-letter',
  imports: [StarEffect],
  templateUrl: './letter.html',
  styleUrl: './letter.css',
})
export class Letter {
  private router = inject(Router);
  readonly opened = signal(false);

  async open() {
    if (this.opened()) return;
    this.opened.set(true);

    await this.sleep(550);

    const startVT = (document as any).startViewTransition;

    if (typeof startVT === 'function') {
      (document as any).startViewTransition(() => {
        void this.router.navigateByUrl('/invitation');
      });
    } else {
      void this.router.navigateByUrl('/invitation');
    }
  }

  private sleep(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
  }
}
