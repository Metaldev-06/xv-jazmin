import { Component, inject, signal } from '@angular/core';
import { Field, form, maxLength, minLength, required, submit } from '@angular/forms/signals';

import { take } from 'rxjs';

import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

import { ArrowUpFromLine, LucideAngularModule, Music4, ShieldX } from 'lucide-angular';

import { PlaylistData } from '../../../../../core/services/playlist-data';
import { PlaylistDataBody } from '../../../../../core/interfaces/playlist-data';

interface PlaylistDataForm {
  artist: string;
  name: string;
  link: string;
}

@Component({
  selector: 'app-playlist',
  imports: [LucideAngularModule, DialogModule, Field, Toast],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
  providers: [MessageService],
})
export class Playlist {
  readonly MusicIcon = Music4;
  readonly ArrowUpFromLineIcon = ArrowUpFromLine;
  readonly ShieldXIcon = ShieldX;

  private readonly playlistData = inject(PlaylistData);
  private readonly messageService = inject(MessageService);

  public wasItSent = signal(false);
  public visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  playlistModel = signal<PlaylistDataForm>({
    name: '',
    artist: '',
    link: '',
  });

  playlistForm = form(this.playlistModel, (path) => {
    required(path.name, { message: 'El nombre de la canción es obligatorio' });
    maxLength(path.name, 50, { message: 'El nombre de la canción no puede exceder 50 caracteres' });
    minLength(path.name, 2, {
      message: 'El nombre de la canción debe tener al menos 2 caracteres',
    });

    required(path.artist, { message: 'El nombre del artista es obligatorio' });
    maxLength(path.artist, 50, { message: 'El nombre del artista no puede exceder 50 caracteres' });
    minLength(path.artist, 2, {
      message: 'El nombre del artista debe tener al menos 2 caracteres',
    });

    maxLength(path.link, 255, { message: 'El enlace no puede exceder 255 caracteres' });
    minLength(path.link, 5, { message: 'El enlace debe tener al menos 5 caracteres' });
  });

  isFieldInvalid(fieldName: keyof PlaylistDataForm): boolean {
    const fieldSignal = this.playlistForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.playlistForm, async (isValid) => {
      if (isValid()) {
        const data = this.playlistForm().value();
        this.sendPlaylist(data);
      }
    });
  }

  onReset() {
    this.playlistModel.set({
      name: '',
      artist: '',
      link: '',
    });
    this.playlistForm().reset();
  }

  sendPlaylist(data: PlaylistDataBody) {
    this.wasItSent.set(true);
    this.playlistData
      .sendPlaylist(data)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Confirmation sent successfully:', response);
          this.onReset();
          this.wasItSent.set(false);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Canción enviada con éxito',
            life: 3000,
          });
        },
        error: (error) => {
          console.error('Error sending confirmation:', error);
          this.wasItSent.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al enviar la canción. Por favor, inténtalo de nuevo.',
            life: 3000,
          });
        },
      });
  }
}
