import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { RegisterComponent } from "./register/register.component";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthComponent } from "./auth/auth.component";
import { LoginGuard } from "./guards/login.guard";
import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";

const appRoutes:Routes = [
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
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]

})

export class AppRoutingModule{}