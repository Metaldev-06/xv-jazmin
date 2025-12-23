import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Address } from './components/address/address';
import { Confirmation } from './components/confirmation/confirmation';
import { Countdown } from './components/countdown/countdown';
import { DressCode } from './components/dress-code/dress-code';
import { Farewell } from './components/farewell/farewell';
import { GiftComponent } from './components/gift/gift';
import { Hero } from './components/hero/hero';
import { ImageComponent } from './components/image-component/image-component';
// import { ImagesGrid } from './components/images-grid/images-grid';
import { Invitation } from './components/invitation/invitation';
import { Gallery } from './components/gallery/gallery';
import { Playlist } from './components/playlist/playlist';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Countdown,
    Address,
    GiftComponent,
    Invitation,
    // ImagesGrid,
    Farewell,
    DressCode,
    Confirmation,
    ImageComponent,
    Gallery,
    Playlist,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  public image1 = `/assets/images/imagen-1.jpeg`;
  public image2 = '/assets/images/imagen-2.jpeg';
  public image3 = '/assets/images/imagen-3.jpeg';
  public image6 = '/assets/images/imagen-6.jpeg';

  public altImage = 'Foto de Jazmin';

  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  // false = muestra botón Play. true = muestra botón Pausa.
  isPlaying: boolean = false;
  private fadeInterval: any;

  // Inyectamos ChangeDetectorRef para forzar la actualización de la vista
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const audio = this.bgMusic.nativeElement;

    // ESCUCHAMOS LOS EVENTOS NATIVOS DEL AUDIO

    // Cuando el audio empieza a sonar (ya sea por autoplay o por clic)
    audio.onplay = () => {
      this.isPlaying = true;
      this.cdr.detectChanges(); // <--- ESTO OBLIGA A MOSTRAR EL ÍCONO DE PAUSA
    };

    // Cuando el audio se detiene
    audio.onpause = () => {
      this.isPlaying = false;
      this.cdr.detectChanges(); // <--- ESTO OBLIGA A MOSTRAR EL ÍCONO DE PLAY
    };

    this.initAudio();
  }

  initAudio() {
    const audio = this.bgMusic.nativeElement;
    audio.volume = 0;

    // Intentamos el Autoplay
    audio
      .play()
      .then(() => {
        // SI ENTRA AQUÍ: El audio suena -> se dispara audio.onplay -> isPlaying se vuelve true -> Aparece ícono Pausa.
        this.fadeInAudio(audio);
      })
      .catch((error) => {
        // SI ENTRA AQUÍ: El navegador bloqueó -> no hay evento play -> isPlaying sigue false -> Aparece ícono Play.
        console.log('Autoplay bloqueado. El usuario debe dar play manual.');
      });
  }

  fadeInAudio(audio: HTMLAudioElement) {
    const targetVolume = 0.1;
    const duration = 2000;
    const intervalTime = 100;
    const step = targetVolume / (duration / intervalTime);

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    this.fadeInterval = setInterval(() => {
      if (audio.volume < targetVolume) {
        const newVolume = audio.volume + step;
        audio.volume = Math.min(newVolume, targetVolume);
      } else {
        clearInterval(this.fadeInterval);
      }
    }, intervalTime);
  }

  toggleAudio() {
    const audio = this.bgMusic.nativeElement;
    if (audio.paused) {
      audio.play(); // Esto disparará onplay automáticamente
      if (audio.volume === 0) this.fadeInAudio(audio);
    } else {
      audio.pause(); // Esto disparará onpause automáticamente
      if (this.fadeInterval) clearInterval(this.fadeInterval);
    }
  }
}
