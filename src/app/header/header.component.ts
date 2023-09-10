// header.component.ts
import { Component, OnDestroy, OnInit ,Inject } from '@angular/core';
import { FirebaseAuthService } from './../services/firebase-auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription = new Subscription();
  isAuthenticated = false;
  currentLang! : string;

  constructor(private firebaseAuth: FirebaseAuthService, private router: Router , 
    public translate:TranslateService, private renderer: Renderer2,  @Inject(DOCUMENT) private document: Document) {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
    }

  ngOnInit(): void {
    this.userSub = this.firebaseAuth.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.firebaseAuth.logout();
  }

  changeCurrentLang(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentLang',lang);
    const newDirection = lang === 'ar' ? 'rtl' : 'ltr';

    // Update the HTML tag's direction
    this.document.documentElement.setAttribute('dir', newDirection)
  }
  
}
