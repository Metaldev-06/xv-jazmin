import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Address } from './components/address/address';
import { Confirmation } from './components/confirmation/confirmation';
import { Countdown } from './components/countdown/countdown';
import { DressCode } from './components/dress-code/dress-code';
import { Farewell } from './components/farewell/farewell';
import { GiftComponent } from './components/gift/gift';
import { Hero } from './components/hero/hero';
import { ImageComponent } from './components/image-component/image-component';
import { ImagesGrid } from './components/images-grid/images-grid';
import { Invitation } from './components/invitation/invitation';
import { Gallery } from './components/gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Countdown,
    Address,
    GiftComponent,
    Invitation,
    ImagesGrid,
    Farewell,
    DressCode,
    Confirmation,
    ImageComponent,
    Gallery,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  public image1 = '/assets/images/imagen-1.jpeg';
  public image2 = '/assets/images/imagen-2.jpeg';
  public image3 = '/assets/images/imagen-3.jpeg';
  public image6 = '/assets/images/imagen-6.jpeg';

  public altImage = 'Foto de Jazmin';
}
