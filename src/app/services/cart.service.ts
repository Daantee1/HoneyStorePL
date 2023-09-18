import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private productsService: ProductsService) {}

  private dataProduct: Product[] = [];

  private dataProductObs = new BehaviorSubject<Product[]>(this.dataProduct);

  

  

  localAddToCart(data: Product, quantity: number) {
    const existingProduct = this.dataProduct.find((product) => {
      return  product.name === data.name;
    });
    
    
    if (existingProduct) {
      if (existingProduct.quantity !== undefined) {
        existingProduct.quantity += quantity;
        
      }
      else {
        existingProduct.quantity = quantity;
        
      }
      
      const newPrice = existingProduct.price.value + data.price.value * quantity;
      existingProduct.price.setValue(newPrice);
      this.dataProductObs.next(this.dataProduct);
      console.log(this.dataProduct)
    } else {
      data.quantity = quantity;
      const initialPrice = data.price.value * quantity;
      data.price.setValue(initialPrice);
      this.dataProduct.push(data);
      this.dataProductObs.next(this.dataProduct);
      console.log(this.dataProduct)
    }
  }

  getlocalAddToCartObs(): Observable<Product[]> {
    return this.dataProductObs.asObservable();
  }
 

  getlocalAddToCarts(): Product[] {
    return this.dataProduct;
  }

  updateCart() {
    this.dataProductObs.next(this.dataProduct);
  }

  clearCart() {
    this.dataProduct = []; 
    this.dataProductObs.next(this.dataProduct); 
  }
}
