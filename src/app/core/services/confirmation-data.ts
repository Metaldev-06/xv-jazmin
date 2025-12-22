import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmationDataBody, ConfirmationDataResponse } from '../interfaces/confirmation-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationData {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'https://prueba.metaldev.cloud/webhook/02c667a2-457e-47d7-b51f-5a4d52a83e89';

  public sendConfirmation(data: ConfirmationDataBody): Observable<ConfirmationDataResponse> {
    return this.http.post<ConfirmationDataResponse>(this.apiUrl, data);
  }
}
