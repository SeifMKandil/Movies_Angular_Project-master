import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0UIuoPHFnsP3-RDcFCXu3AWG4_FDx_8g', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      this.router.navigate(['/']);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0UIuoPHFnsP3-RDcFCXu3AWG4_FDx_8g', {
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userDataFireBase');
  }

  autoLogin(){
    const storedUserDataString = localStorage.getItem('userDataFireBase');
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate: string;
    } = JSON.parse(storedUserDataString as string);
    if(!userData){
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token){
      this. userSubject.next(loadedUser);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.userSubject.next(user);
    localStorage.setItem('userDataFireBase' , JSON.stringify(user));
    
  
  }
}
