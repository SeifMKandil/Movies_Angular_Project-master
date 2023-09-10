import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  onRegister(form:NgForm , type:string): void {
    if (type === 'Firebase') {
      this.isLoading=true;
      
      this.firebaseAuthService.register(form.value.email ,form.value.password).subscribe(
        responseData => {
          
          this.isLoading=false;
        }, error => {
        
          this.error="Error Occured"
          this.isLoading=false;
        }
        
      )
      
    } else {
      if (this.registerForm.valid) {
        const registerObj = {
          userName: form.value.userName,
          email: form.value.email,
          password: form.value.password
        };

        this.authService.addRegisteredUser(registerObj);
        localStorage.setItem('registeredUsers', JSON.stringify(this.authService.getRegisteredUsers()));
        
        // Add Local Storage registration logic here
      }
    }
  }
}
