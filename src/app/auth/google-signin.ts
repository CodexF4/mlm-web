import {
  Component,
  ElementRef,
  afterNextRender,
  output,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import { GOOGLE_CLIENT_ID } from './google.config';

declare const google: any;

/**
 * Renders Google's official "Sign in with Google" button (Google Identity Services)
 * and emits the returned ID token via (credential). Browser-only via afterNextRender.
 */
@Component({
  selector: 'app-google-signin',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<div #btn class="flex justify-center"></div>',
})
export class GoogleSignin {
  readonly credential = output<string>();
  private readonly btn = viewChild.required<ElementRef<HTMLElement>>('btn');

  constructor() {
    afterNextRender(() => this.init());
  }

  private async init(): Promise<void> {
    await this.loadScript();

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: { credential: string }) => this.credential.emit(response.credential),
    });

    google.accounts.id.renderButton(this.btn().nativeElement, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      width: 320,
    });
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const w = window as any;
      if (w.google?.accounts?.id) {
        resolve();
        return;
      }

      const existing = document.getElementById('google-gsi') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject());
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-gsi';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }
}
