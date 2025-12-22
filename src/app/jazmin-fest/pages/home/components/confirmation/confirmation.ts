import { Component, signal } from '@angular/core';
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

interface ConfirmationData {
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

  confirmationModel = signal<ConfirmationData>({
    name: '',
    dni: 0,
    message: '',
    confirmed: false,
  });

  confirmationForm = form(this.confirmationModel, (path) => {
    required(path.name, { message: 'El nombre es obligatorio' });
    maxLength(path.name, 50, { message: 'El nombre y apellido no puede exceder 50 caracteres' });
    minLength(path.name, 3, { message: 'El nombre y apellido debe tener al menos 3 caracteres' });

    required(path.dni, { message: 'El DNI es obligatorio' });
    max(path.dni, 99999999, { message: 'El DNI no puede exceder 8 dígitos' });
    min(path.dni, 1000000, { message: 'El DNI debe tener al menos 7 dígitos' });

    maxLength(path.message, 250, { message: 'El mensaje no puede exceder 250 caracteres' });

    required(path.confirmed, { message: 'Debes confirmar tu asistencia' });
  });

  isFieldInvalid(fieldName: keyof ConfirmationData): boolean {
    const fieldSignal = this.confirmationForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.confirmationForm, async (isValid) => {
      if (isValid()) {
        console.log(this.confirmationForm().value());
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
}
