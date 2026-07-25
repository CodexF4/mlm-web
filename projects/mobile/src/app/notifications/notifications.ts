import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notifications',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  templateUrl: './notifications.html',
})
export class NotificationsPage {}
