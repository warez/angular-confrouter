import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import {UserManagerService} from "ROOT/services/user-manager.service";

const simpleCheckGuard = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot): Promise<boolean | UrlTree> => {

  const userManager = inject(UserManagerService);
  const router = inject(Router);

  if(!userManager.user) {
    //doLogin
  }

  return userManager.authenticated;
}

export const canActivateAuthRole = simpleCheckGuard as CanActivateFn;
