import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {}