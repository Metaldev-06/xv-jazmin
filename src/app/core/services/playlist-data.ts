import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistDataBody, PlaylistDataResponse } from '../interfaces/playlist-data';

@Injectable({
  providedIn: 'root',
})
export class PlaylistData {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'https://prueba.metaldev.cloud/webhook/02c667a2-457e-47d7-b51f-5a4d52a83e89';

  public sendPlaylist(data: PlaylistDataBody): Observable<PlaylistDataResponse> {
    return this.http.post<PlaylistDataResponse>(this.apiUrl, data);
  }
}
