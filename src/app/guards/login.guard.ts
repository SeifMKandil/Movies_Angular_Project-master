// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: FirebaseAuthService,
    private router: Router
  ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (this.authService.isAuthenticated()) {
  //     return true;
  //   }
  //   this.router.navigate(['/auth']); // Redirect to login page if not authenticated
  //   return false;
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean| UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      take(1),
      map((user: any) => {
        const isAuth = !!user;
        if (isAuth){
          return this.router.createUrlTree(['/']);
        }
        return true;
      })
    );
  }
}
