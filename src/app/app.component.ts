import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {
  title = 'StalowyMiod';
  isLoggedIn: boolean = false;
  qCart: number = 0

  constructor(public authService: AuthService, private router: Router, private cartService: CartService, ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedInObs.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
     this.cartService.getlocalAddToCartObs().subscribe((data)=>{
     
      this.qCart = data.length
    })
  }






 
}

 

  

