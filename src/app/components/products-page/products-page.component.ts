import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {

  @Input() sortDesc: boolean = false;
  @Input() sortAsc: boolean = false;

  constructor(private filterService: FilterService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsPage = this.productsService.getProductsPages();
  }

  productsPage: Product[] = []
    

  onAscendingSort() {
    this.productsPage = this.filterService.sortbyascending(this.productsPage);
  }

  onDescendingSort() {
    this.productsPage = this.filterService.sortbydescending(this.productsPage);
  }
}
