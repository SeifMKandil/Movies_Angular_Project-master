import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  error : string ='';

  constructor(private authService: AuthenticationService , private firebaseAuthService : FirebaseAuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onRegister(type: string | null = null): void {
    if (type === 'Firebase') {
      this.isLoading=true;
      console.log('Registering with Firebase');
      this.firebaseAuthService.register(this.registerForm.value.email ,this.registerForm.value.password).subscribe(
        responseData => {
          console.log(responseData);
          this.isLoading=false;
        }, error => {
          console.log(error);
          this.error="Error Occured"
          this.isLoading=false;
        }
        
      )
      
    } else {
      if (this.registerForm.valid) {
        const registerObj = {
          userName: this.registerForm.value.userName,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };

        this.authService.addRegisteredUser(registerObj);
        localStorage.setItem('registeredUsers', JSON.stringify(this.authService.getRegisteredUsers()));
        console.log('Registering with Local Storage');
        // Add Local Storage registration logic here
      }
    }
  }
}
