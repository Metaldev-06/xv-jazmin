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
    'https://prueba.metaldev.cloud/webhook/4be57ad5-3b46-413f-b018-1150898f8182';

  public sendPlaylist(data: PlaylistDataBody): Observable<PlaylistDataResponse> {
    return this.http.post<PlaylistDataResponse>(this.apiUrl, data);
  }
}
