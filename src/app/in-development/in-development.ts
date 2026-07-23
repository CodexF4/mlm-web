import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonButton, IonDatetime } from '@ionic/angular/standalone';

@Component({
  selector: 'app-in-development',
  imports: [IonButton, IonDatetime],
  templateUrl: './in-development.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './in-development.css',
})
export class InDevelopment {}
