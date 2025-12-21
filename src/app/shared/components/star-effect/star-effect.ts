import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

type Star = {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  baseA: number;
  tw: number;
  ph: number;
  color: string;
};

@Component({
  selector: 'app-star-effect',
  imports: [],
  templateUrl: './star-effect.html',
  styleUrl: './star-effect.css',
})
export class StarEffect {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];

  private dpr = Math.min(1.5, window.devicePixelRatio || 1);
  private rafId: number | null = null;
  private last = 0;

  private readonly FPS = 30;
  private readonly frameTime = 1000 / this.FPS;

  private readonly colors = ['#dac2fe', '#ffffff', '#c7b3ff', '#f1e8ff'];
  private readonly reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private resizeHandler = () => this.resize();
  private visibilityHandler = () => this.onVisibilityChange();

  // Path2D precomputado (rápido)
  private readonly STAR = this.createStarPath();

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    this.ctx = ctx;

    this.resize();
    this.seedStars();

    window.addEventListener('resize', this.resizeHandler, { passive: true });
    document.addEventListener('visibilitychange', this.visibilityHandler);

    // Importante: correr fuera de Angular para no disparar CD en cada frame
    this.zone.runOutsideAngular(() => {
      if (!this.reduceMotion) {
        this.rafId = requestAnimationFrame((t) => this.step(t));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.resizeHandler);
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  private onVisibilityChange() {
    if (document.hidden) {
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
      this.rafId = null;
    } else if (!this.reduceMotion) {
      this.last = 0;
      this.zone.runOutsideAngular(() => {
        this.rafId = requestAnimationFrame((t) => this.step(t));
      });
    }
  }

  private resize() {
    const canvas = this.canvasRef.nativeElement;
    const w = Math.floor(window.innerWidth * this.dpr);
    const h = Math.floor(window.innerHeight * this.dpr);

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }

  private seedStars() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const count = isMobile ? 24 : 40;

    this.stars = Array.from({ length: count }, () => this.makeStar());
  }

  private makeStar(): Star {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const size = this.rand(6, isMobile ? 14 : 18);

    return {
      x: this.rand(0, window.innerWidth),
      y: this.rand(0, window.innerHeight),
      size,
      vy: this.rand(0.15, 0.55),
      vx: this.rand(-0.12, 0.12),
      rot: this.rand(0, Math.PI * 2),
      vr: this.rand(-0.01, 0.01),
      baseA: this.rand(0.25, 0.8),
      tw: this.rand(0.015, 0.045),
      ph: this.rand(0, Math.PI * 2),
      color: this.colors[(Math.random() * this.colors.length) | 0],
    };
  }

  private step(t: number) {
    if (t - this.last < this.frameTime) {
      this.rafId = requestAnimationFrame((tt) => this.step(tt));
      return;
    }
    this.last = t;

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = window.innerWidth;
    const height = window.innerHeight;

    for (const s of this.stars) {
      s.y += s.vy;
      s.x += s.vx;
      s.rot += s.vr;
      s.ph += s.tw;

      if (s.y - s.size > height) {
        s.y = -s.size;
        s.x = this.rand(0, width);
      }
      if (s.x < -40) s.x = width + 40;
      if (s.x > width + 40) s.x = -40;

      this.drawStar(s);
    }

    this.rafId = requestAnimationFrame((tt) => this.step(tt));
  }

  private drawStar(s: Star) {
    const ctx = this.ctx;

    const tw = (Math.sin(s.ph) + 1) / 2; // 0..1
    const a = s.baseA * (0.6 + tw * 0.4);

    const x = s.x * this.dpr;
    const y = s.y * this.dpr;

    // Glow barato: doble pintado (sin shadowBlur)
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(s.rot);

    // capa “glow”
    ctx.globalAlpha = a * 0.35;
    ctx.fillStyle = s.color;
    ctx.scale(s.size * 1.35 * this.dpr, s.size * 1.35 * this.dpr);
    ctx.fill(this.STAR);

    // capa principal
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(x, y);
    ctx.rotate(s.rot);
    ctx.globalAlpha = a;
    ctx.fillStyle = s.color;
    ctx.scale(s.size * this.dpr, s.size * this.dpr);
    ctx.fill(this.STAR);

    ctx.restore();
  }

  private createStarPath(): Path2D {
    const p = new Path2D();
    const spikes = 5;
    const outer = 1;
    const inner = 0.45;
    let rot = -Math.PI / 2;
    const step = Math.PI / spikes;

    p.moveTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
    for (let i = 0; i < spikes; i++) {
      rot += step;
      p.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
      rot += step;
      p.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
    }
    p.closePath();
    return p;
  }

  private rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
