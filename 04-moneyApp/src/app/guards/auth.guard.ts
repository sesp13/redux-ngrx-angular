import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.guardBody();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.guardBody();
  }

  guardBody(): Observable<boolean> {
    return this.authService.isUserAuth().pipe(
      tap((isUserAuth) => {
        if (!isUserAuth) this.router.navigate(['/login']);
      }),
      // Cancel continous subscription
      take(1)
    );
  }
}
