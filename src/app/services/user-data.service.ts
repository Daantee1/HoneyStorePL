import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { 
    this.getUsersToDB()
  }

  private usersAll: User[] = []
  private usersAllObs = new BehaviorSubject<User[]>(this.usersAll);

  addUsers(user: User){

    this.usersAll.push(user)
    this.usersAllObs.next(this.usersAll)
    
  }

  getUsersObs(): Observable<User[]>{
    return this.usersAllObs.asObservable()
  }

  emailChecking(email: string){
    const emailLowerCase = email.toLowerCase()
    console.log(this.usersAll)
      return this.usersAll.some((user) => user.email && user.email.toLowerCase() === emailLowerCase ) 
      
  }

  getUsersToDB(){
    this.http.get("http://localhost:3000/api/users")
    .subscribe((resultData: any ) =>{
      console.log(resultData.data)
      this.usersAll = resultData.data
      this.usersAllObs.next(this.usersAll);
    })

    
  }

  
  


  }





