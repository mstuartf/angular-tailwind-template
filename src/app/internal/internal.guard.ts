import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../../providers/user/user.service';

@Injectable({
    providedIn: 'root',
})
export class InternalGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.userService.getToken()) {
            return true;
        }

        this.router.navigate(['external/login']);

        return false;

    }

}
