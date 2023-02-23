import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from './product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit {
  readonly products$: Observable<Product[]> =
    this.productsService.getProducts();

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {}
}
