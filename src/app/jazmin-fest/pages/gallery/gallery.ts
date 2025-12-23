import { Component, inject } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

// interface UploadEvent {
//   originalEvent: Event;
//   files: File[];
// }

@Component({
  selector: 'app-gallery',
  imports: [FileUpload, ToastModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  providers: [MessageService],
})
export default class Gallery {
  uploadedFiles: any[] = [];

  private readonly messageService = inject(MessageService);

  onUpload(event: FileUploadHandlerEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Subida exitosa', detail: '' });
  }
}
