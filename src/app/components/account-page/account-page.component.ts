import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent {
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService,
    private router: Router,
    public authService: AuthService,
    private cookieService: CookieService
  ) {
    
  }

  email: string = '';
  password: string = '';
  userData : any =  {}

  login() {
    console.log(this.email);
    console.log(this.password);
    let bodyData = {
      email: this.email,
      password: this.password,
    };
    this.http
      .post('http://localhost:3000/api/users/login', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        
        if (resultData.status) {
          if (this.authService.login(this.email, this.password)) {
            
            this.authService.setUserData(resultData.userData)
            this.router.navigate(['/AccountProfile'])
            
          }
        } else {
          alert('Błędne dane logowania');
        }
      });
  }

 
 
}
