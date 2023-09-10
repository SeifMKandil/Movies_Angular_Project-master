// import { LoginGuard } from './guards/login.guard';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from './shared/spinner.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';






const appRoutes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'movieDetails/:id',component:MovieDetailsComponent},
  {
    path: 'catalogue',
    component: CatalogueComponent,
    canActivate: [AuthGuard], 
  },

  

  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuard], 
  },
] 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    CatalogueComponent,
    AuthComponent,
    RegisterComponent,
    MovieDetailsComponent,
    SpinnerComponent,
    
  
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    
    
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }

    }
    
    )
    
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}


// const ApiKey = "f2d7215515a34f350462609e31a408ef";
// const Base = 'https://api.themoviedb.org/3/'
// https://api.themoviedb.org/3/movie/157336?api_key=f2d7215515a34f350462609e31a408ef