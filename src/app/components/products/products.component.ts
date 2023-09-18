import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
@Input() sortDesc: boolean = false
@Input() sortAsc: boolean = false

  constructor(private filterService : FilterService, private productsService: ProductsService){
    
  }

  ngOnInit(): void {
    
    this.products = this.productsService.getProducts();
    
  }

  products: Product[] = []
   

  ngOnChanges() {
    if (this.sortDesc) {
      this.products = this.filterService.sortbydescending(this.products);
    } 
    if (this.sortAsc) {
      this.products = this.filterService.sortbyascending(this.products);
    } 
    
  }

  

}