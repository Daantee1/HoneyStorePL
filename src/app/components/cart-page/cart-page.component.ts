import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  dataCartProduct: Product[] = [];

  constructor(private cartService: CartService, public authSrvice: AuthService, private router: Router) {
    this.authSrvice.isLoggedInObs.subscribe((data) =>{
      this.isLoggedIn = data
    })
   }

  isLoggedIn : boolean = false
  totalAmount: number = 0

  ngOnInit(): void {
    this.cartService.getlocalAddToCartObs().subscribe(data => {
      this.dataCartProduct = data;
      this.calculateTotalAmount()
    });
  }

  deleteProduct(product: Product) {
    const index = this.dataCartProduct.indexOf(product)
    if(index !== - 1){
      this.dataCartProduct.splice(index, 1)
      this.cartService.updateCart();
    }
}

buyIt(){
  if(this.isLoggedIn){
    this.router.navigate(['/Payment'])
  }else {
    this.router.navigate(['/AccountPage'])
  }
}

calculateTotalAmount(){
  let totalAmount$ = 0
  for(let i = 0; i < this.dataCartProduct.length; i++){
    const product = this.dataCartProduct[i]
    if (product.quantity !== undefined && product.quantity > 0) {
      totalAmount$ += product.price.value;
    }
  }
  this.totalAmount = totalAmount$
}

}

