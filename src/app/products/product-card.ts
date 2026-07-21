import { Component, inject, input } from '@angular/core';

import { CartService } from '../cart/cart.service';
import { Product, unitPrice, formatPeso } from './product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html'
})
export class ProductCard {
  private readonly cart = inject(CartService);

  readonly product = input.required<Product>();

  protected readonly unitPrice = unitPrice;
  protected readonly formatPeso = formatPeso;

  protected addToCart(): void {
    this.cart.add(this.product());
  }
}
