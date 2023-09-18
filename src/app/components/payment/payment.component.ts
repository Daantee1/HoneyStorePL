import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { set } from 'lodash';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
 
  constructor(public authService: AuthService, private userDataService: UserDataService, private cartService: CartService,
     private router: Router, private http: HttpClient){
    authService.userDataObs.subscribe((data)=>{
      this.currentUser = data
    })
    this.cartService.getlocalAddToCartObs().subscribe((cartData) => {
      this.dataCartProduct = cartData
      this.calculateTotalAmount()
    })
    authService.isLoggedInObs.subscribe((data) =>{
      this.isLoggedIn = data
    })
    
  }
  isLoggedIn : boolean = false
  currentUser: any = {}
  dataCartProduct: Product[] = []
  totalAmount: number = 0
  loadingSpinner: boolean = true
  loadingSpinnerAdd: boolean = true
  
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

  buyIt() {
    this.loadingSpinner = false;
  
    setTimeout(() => {
      this.loadingSpinner = true;
  
      setTimeout(() => {
        this.loadingSpinnerAdd = false;
        if (this.isLoggedIn) {
          // Opóźnij nawigację na stronę
          setTimeout(() => {
            this.router.navigate(['/AccountProfile']);
            this.cartService.clearCart();
          }, 1000); 
        }
      }, 1000); 
    }, 2000); 

    let bodyData = this.dataCartProduct.map(product =>({
      name: product.name,
      price: product.price,
      quantity: product.quantity  || 0,
      userId: this.currentUser.id
    }))
     
    
    this.http.post('http://localhost:3000/api/products/add', bodyData).subscribe((resultData: any) => {
      if(resultData){
        console.log('Added successfully')
      }else{
        console.log('Error with add data to Database')
      }
    })
  }
  
  
}
