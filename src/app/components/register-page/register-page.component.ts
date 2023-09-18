import { HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserDataService } from 'src/app/services/user-data.service';
import emailjs from "@emailjs/browser"
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  constructor(private userDataService: UserDataService, private http: HttpClient, private router: Router) {
    this.userDataService.getUsersObs().subscribe((data)=>{
      this.users = data
    })
  }
  users: User[] = [];

 



  user: User = {
    login: '',
    password: '',
    passwordConfirm: '',
    email: '',
    street: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
  };

  passwordsDoNotMatch: boolean = false;

  

  checkPassword() {
    this.passwordsDoNotMatch = this.user.password !== this.user.passwordConfirm;
  }

  formatZipCode() {
    if (this.user.zipCode.length === 2) {
      this.user.zipCode += '-';
    }
  }

  submitForm() {
    const emailCheck = this.userDataService.emailChecking(this.user.email);
    if (emailCheck) {
      console.log("Użytkownik o takim e-mailu już jest w bazie");
      alert("Użytkownik o takim e-mailu już jest w bazie");
    } else {
      const newUser: User = { ...this.user };
      this.userDataService.addUsers(newUser);
      this.sendEmail()
      this.setUserToDB()
      alert("Zaraz zostaniesz przeniesiony na stronę logowania...");
      
    setTimeout(() => {
      this.router.navigate(['/AccountPage']); 
    }, 3000);
     
    }
  }

  setUserToDB(){

    let bodyData = {
    "fullname": this.user.login,
    "email": this.user.email,
    "address": this.user.street,
    "city": this.user.city,
    "zipcode": this.user.zipCode,
    "phonenumber": this.user.phoneNumber,
    "password": this.user.password
    }

    this.http.post("http://localhost:3000/api/users/add", bodyData).subscribe((resultData:any) =>{
      console.log(resultData)
      alert("Zarejestrowano pomyślnie!")
      this.userDataService.getUsersToDB()
    } )


}

sendEmail() {
  const params = {
    from_name: "Stalowy Miód",
    to_name: this.user.login,
    from_email : this.user.email,
    message: `Dziękuję za rejestrację na naszej stronie! Jeśli chcesz więcej informacji na mój temat, odwiedź moje profile społecznościowe:\n\nYT: https://www.youtube.com/channel/UCf8UHCMNj30uAqCtR9DMu0w\n\nGitHub: https://github.com/Daantee1 \n\nhttps://open.spotify.com/artist/3N0Cp3BzyE4ajdIrlhouKp?si=cYKflkn_T-ekQI0f_MBAJw`
  }
  
    emailjs.send('service_41my96j', 'template_qvyl7wj', params, 'XtoGYqOEtIfnk78YR').then((res) =>{
      console.log("Success" + res.status)
    })
    .catch((err) =>{
      console.log("Error" + err.status)
    })
  
}






}
