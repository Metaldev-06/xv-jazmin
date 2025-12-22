import { Component, inject, signal } from '@angular/core';
import {
  Field,
  form,
  max,
  maxLength,
  min,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';

import { LucideAngularModule, ShieldX } from 'lucide-angular';

import { ConfirmationData } from '../../../../../core/services/confirmation-data';
import { ConfirmationDataBody } from '../../../../../core/interfaces/confirmation-data';
import { take } from 'rxjs';

interface ConfirmationDataForm {
  name: string;
  dni: number;
  message: string;
  confirmed: boolean;
}

@Component({
  selector: 'app-confirmation',
  imports: [Field, LucideAngularModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  readonly ShieldXIcon = ShieldX;

  private readonly confirmationData = inject(ConfirmationData);

  public wasItSent = signal(false);

  confirmationModel = signal<ConfirmationDataForm>({
    name: '',
    dni: 0,
    message: '',
    confirmed: false,
  });

  confirmationForm = form(this.confirmationModel, (path) => {
    required(path.name, { message: 'El nombre y apellido es obligatorio' });
    maxLength(path.name, 50, { message: 'El nombre y apellido no puede exceder 50 caracteres' });
    minLength(path.name, 3, { message: 'El nombre y apellido debe tener al menos 3 caracteres' });

    required(path.dni, { message: 'El DNI es obligatorio' });
    max(path.dni, 99999999, { message: 'El DNI no puede exceder 8 dígitos' });
    min(path.dni, 1000000, { message: 'El DNI debe tener al menos 7 dígitos' });

    maxLength(path.message, 250, { message: 'El mensaje no puede exceder 250 caracteres' });

    required(path.confirmed, { message: 'Debes confirmar tu asistencia' });
  });

  isFieldInvalid(fieldName: keyof ConfirmationDataForm): boolean {
    const fieldSignal = this.confirmationForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.confirmationForm, async (isValid) => {
      if (isValid()) {
        const data = this.confirmationForm().value();
        this.sendConfirmation(data);
      }
    });
  }

  onReset() {
    this.confirmationModel.set({
      name: '',
      dni: 0,
      message: '',
      confirmed: false,
    });
    this.confirmationForm().reset();
  }

  sendConfirmation(data: ConfirmationDataBody) {
    this.wasItSent.set(true);
    this.confirmationData
      .sendConfirmation(data)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Confirmation sent successfully:', response);
          this.onReset();
          this.wasItSent.set(false);
        },
        error: (error) => {
          console.error('Error sending confirmation:', error);
          this.wasItSent.set(false);
        },
      });
  }
}
