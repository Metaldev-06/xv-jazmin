import { Component, signal } from '@angular/core';

import { LucideAngularModule, Gift, Landmark, AtSign } from 'lucide-angular';

type CopyKey = 'cvu' | 'alias';

@Component({
  selector: 'app-gift',
  imports: [LucideAngularModule],
  templateUrl: './gift.html',
  styleUrl: './gift.css',
})
export class GiftComponent {
  readonly GiftIcon = Gift;
  readonly LandmarkIcon = Landmark;
  readonly AtSignIcon = AtSign;

  readonly cvu = '0000003100050577417929';
  readonly alias = 'fernydiaz62.mp';

  readonly copiedKey = signal<CopyKey | null>(null);

  async copy(key: CopyKey) {
    const text = key === 'cvu' ? this.cvu : this.alias;

    const ok = await this.copyToClipboard(text);

    if (!ok) {
      // si querés, podés mostrar otro feedback tipo "No se pudo copiar"

      return;
    }

    this.copiedKey.set(key);
    window.setTimeout(() => this.copiedKey.set(null), 1500);
  }

  private async copyToClipboard(text: string): Promise<boolean> {
    try {
      // ✅ Método moderno (requiere https o localhost)
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // seguimos con fallback
    }

    // ✅ Fallback: execCommand (menos moderno pero útil en algunos casos)
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';

      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textarea);

      return success;
    } catch {
      return false;
    }
  }
}
