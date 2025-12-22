import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-component',
  imports: [],
  templateUrl: './image-component.html',
  styleUrl: './image-component.css',
})
export class ImageComponent {
  public imageUrl = input.required<string>();
  public imageAlt = input.required<string>();
}
