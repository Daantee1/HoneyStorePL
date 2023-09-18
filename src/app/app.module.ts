import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartService } from './services/cart.service';
import { FilterService } from './services/filter.service';
import { ProductsService } from './services/products.service';
import { UserDataService } from './services/user-data.service';
import {HttpClientModule} from '@angular/common/http';
import { AccountProfileComponent } from './components/account-profile/account-profile.component'
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PaymentComponent } from './components/payment/payment.component';




const appRoute:Routes = [
{path: '', redirectTo: 'Home', pathMatch: 'full'},
{path: 'Home', component : HomeComponent},
{path: 'Products', component: ProductsComponent},
{path: 'ProductsPage', component: ProductsPageComponent},
{path: 'AboutUsPage', component: AboutUsPageComponent},
{path: 'AccountPage', component:  AccountPageComponent},
{path: 'RegisterPage', component: RegisterPageComponent},
{path: 'details/:name', component: ProductDetailComponent},
{path: 'CartPage', component: CartPageComponent},
{path: 'AccountProfile', component: AccountProfileComponent},
{path: 'Payment', component: PaymentComponent},
{ path: '**', redirectTo: '/login' },



]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    FilterComponent,
    ProductsPageComponent,
    AboutUsPageComponent,
    AccountPageComponent,
    RegisterPageComponent,
    ProductDetailComponent,
    CartPageComponent,
    AccountProfileComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  
  ],
  providers: [CookieService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
