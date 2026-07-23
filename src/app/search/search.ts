import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductCard } from '../products/product-card';
import { PRODUCTS } from '../products/products.data';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-search',
  imports: [ProductCard],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './search.html',
})
export class Search {
  private readonly route = inject(ActivatedRoute);

  protected readonly query = signal('');
  protected readonly results = signal<Product[]>([]);

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const q = (params.get('q') ?? '').trim();
      this.query.set(q);
      const needle = q.toLowerCase();
      this.results.set(
        q ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(needle)) : PRODUCTS,
      );
    });
  }
}
