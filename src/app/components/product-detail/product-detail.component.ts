import { compileNgModule } from '@angular/compiler';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() products: Product[] = [];

  constructor(private route: ActivatedRoute, private productsService: ProductsService, 
    private cartService: CartService) {}
  
  product: Product | undefined;
  inputNumber: any

  ngOnInit(): void {
    this.inputNumber = 1;
    this.route.paramMap.subscribe(params => {
      const productName = params.get('name');
      if (productName) {
        this.product = this.productsService.getProductByName(productName)
      }
    });
 
  }

  plusProduct(){
    if(this.inputNumber < 99)
    this.inputNumber = this.inputNumber +1
  }
  minusProduct(){
    if(this.inputNumber > 1){
      this.inputNumber = this.inputNumber -1
    }
  }
  
  addToCart(product: Product){
    if(this.product){
      const copiedProduct: Product = cloneDeep(product);
      this.cartService.localAddToCart(copiedProduct, this.inputNumber)
    }
    
  
    
  }
 
}
