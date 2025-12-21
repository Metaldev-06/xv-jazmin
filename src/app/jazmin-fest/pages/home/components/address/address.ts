import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address {
  EVENT_DETAILS = {
    name: 'Jazmin',
    date: '2026-01-24T21:00:00', // Formato YYYY-MM-DDTHH:MM:SS
    locationMapUrl: 'https://maps.app.goo.gl/Uq9eZ7VHPG89wwxSA', // Link para botón
  };
  eventDate = new Date(this.EVENT_DETAILS.date);

  openMap() {
    window.open(this.EVENT_DETAILS.locationMapUrl, '_blank');
  }
}
