import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartItem, CartService } from './cart.service';
import { unitPrice, formatPeso } from '../products/product.model';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './cart.html',
})
export class Cart {
  private readonly cartService = inject(CartService);

  protected readonly items = this.cartService.items;
  protected readonly allSelected = this.cartService.allSelected;
  protected readonly selectedCount = this.cartService.selectedCount;
  protected readonly selectedTotal = this.cartService.selectedTotal;

  protected readonly unitPrice = unitPrice;
  protected readonly formatPeso = formatPeso;

  protected lineTotal(item: CartItem): number {
    return unitPrice(item.product) * item.qty;
  }

  protected toggle(id: number) {
    this.cartService.toggleSelected(id);
  }

  protected toggleAll(event: Event) {
    this.cartService.setAllSelected((event.target as HTMLInputElement).checked);
  }

  protected inc(id: number) {
    this.cartService.increment(id);
  }

  protected dec(id: number) {
    this.cartService.decrement(id);
  }

  protected setQty(id: number, event: Event) {
    this.cartService.setQty(id, Number((event.target as HTMLInputElement).value));
  }

  protected remove(id: number) {
    this.cartService.remove(id);
  }

  protected removeSelected() {
    this.cartService.removeSelected();
  }
}
