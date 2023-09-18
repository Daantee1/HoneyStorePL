import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  
  sortbyascending(products: Product[]): Product[]{ //rosnaco
    return products.sort((a,b)=> a.price.value - b.price.value)
  }
  sortbydescending(products: Product[]): Product[]{ //malejaco
    return products.sort((a,b)=> b.price.value - a.price.value)
  }
  }

