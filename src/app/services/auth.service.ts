import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedInObs = this.isLoggedInSubject.asObservable();
  private userDataSubject = new BehaviorSubject<any | null>(null);
  userDataObs = this.userDataSubject.asObservable();
  isLoggedIn: any;
  private authToken: string | null = null 

  login(email: string, password: string): boolean {
    
    this.isLoggedInSubject.next(true); 

    
    return true;
  }
  
  setAuthToken(token: string){
    this.authToken = token
  }

  getAuthToken(){
    return this.authToken
  }

  setUserData(userData: any) {
    this.userDataSubject.next(userData);
  }

  logout(): void {
    this.isLoggedInSubject.next(false); 
    this.userDataSubject.next(null);
   
    
  }


}