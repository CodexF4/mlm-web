import { Component, signal } from '@angular/core';
import { IonRouterOutlet, IonApp } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  imports: [IonRouterOutlet, IonApp],
  templateUrl: './app.html',
  // styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('mobile');
}
