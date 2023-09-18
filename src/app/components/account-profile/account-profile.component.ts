import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
})
export class AccountProfileComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private userDataService: UserDataService
  ) {
    this.authService.isLoggedInObs.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.isLoggedIn = cookieService.get('isLoggedIn') === 'true';
  }

  ngOnInit(): void {
    this.authService.userDataObs.subscribe((userData) => {
      if (userData) {
        this.currentUser = userData;
        console.log('Database connected');
      } else {
        console.log('Cannot find databse');
      }
    });
    console.log(this.currentUser.id)
    console.log(this.currentUser.password)
    this.selectedOption = 'daneKontaktowe';
    
    this.getCurrentProduct()
    console.log(this.currentProduct)
  }

  currentUser: any = {};
  isLoggedIn: boolean = false;
  selectedOption: string = '';
  password: string = '';
  currentPassword: string = ''
  passwordConfirm: string = '';
  passwordsDoNotMatch: boolean = false;
  isCurrentPasswordValid: boolean = false;
  currentProduct : Product[] = []

 
  checkPassword() {
    this.passwordsDoNotMatch = this.password !== this.passwordConfirm;
  }

  checkCurrentPassword() {
    if (this.currentPassword) {
    
      this.http
        .post(`http://localhost:3000/api/users/checkpassword/${this.currentUser.id}`, { currentPassword: this.currentPassword })
        .subscribe((resultData: any) => {
          this.isCurrentPasswordValid = resultData.status === true;
        });
    } else {
      this.isCurrentPasswordValid = false;
    }
  }
  changepassword() {
    if (this.password != this.passwordConfirm) {
      this.passwordsDoNotMatch = true;
    } else {
      let bodyData = {
        id: this.currentUser.id,
        password: this.password,
        
      };
      console.log(bodyData.id)

      this.http
        .put(`http://localhost:3000/api/users/update/password/${bodyData.id}`, bodyData)
        .subscribe((resultData) => {
          if (resultData) {
            console.log('Udało się zmienić hasło');
            this.userDataService.getUsersToDB()
            this.password = ''
            this.passwordConfirm = ''
            this.currentPassword = ''
          } else {
            console.log('Error');
          }
        });
    }
  }

  ul = [
    {
      label: 'Dane kontaktowe',
      action: () => {
        console.log('Kliknięto "Dane kontaktowe"');
        this.selectedOption = 'daneKontaktowe';
      },
    },
    {
      label: 'Moje zamówienia',
      action: () => {
        console.log('Kliknięto "Moje zamówienia"');
        this.selectedOption = 'mojeZamowienia';
      },
    },
    {
      label: 'Zmień hasło',
      action: () => {
        console.log('Kliknięto "Zmień hasło"');
        this.selectedOption = 'zmienHaslo';
      },
    },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/AccountPage']);
    this.cookieService.delete('isLoggedIn');
    this.isLoggedIn = false;
  }


  getCurrentProduct() {
    this.http.get(`http://localhost:3000/api/products/user/${this.currentUser.id}`).subscribe(
      (resultData: any) => {
        console.log('Odpowiedź z serwera:', resultData);
        if (resultData.status === true && resultData.data.length > 0) {
          this.currentProduct = resultData.data;
          console.log('Dane produktów:', this.currentProduct);
        } else {
          console.log('Brak danych produktów');
        }
      },
      (error) => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }
}
