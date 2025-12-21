import { Component, computed, signal } from '@angular/core';

type CountdownType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
};

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
})
export class Countdown {
  private readonly targetIso = '2026-01-24T21:00:00-03:00';

  private readonly targetMs = new Date(this.targetIso).getTime();

  // Signal “reloj”: la actualizamos cada 1s
  private readonly nowMs = signal(Date.now());

  // Countdown derivado (computed)
  readonly countdown = computed<CountdownType>(() => {
    const diff = this.targetMs - this.nowMs();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isFinished: false };
  });

  private intervalId: number;

  constructor() {
    // tick cada 1 segundo
    this.intervalId = window.setInterval(() => {
      this.nowMs.set(Date.now());
    }, 1000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.intervalId);
  }
}
