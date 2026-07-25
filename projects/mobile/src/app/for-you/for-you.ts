import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

import { PRODUCTS } from '../products/products.data';
import { unitPrice, formatPeso } from '../products/product.model';

@Component({
  selector: 'app-for-you',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  templateUrl: './for-you.html',
  styleUrl: './for-you.scss',
})
export class ForYouPage {
  protected readonly products = PRODUCTS;
  protected readonly unitPrice = unitPrice;
  protected readonly formatPeso = formatPeso;
}
