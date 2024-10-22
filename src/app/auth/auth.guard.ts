import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { jwtDecode } from "jwt-decode";
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean|UrlTree>
     | Promise<boolean>
     | boolean |UrlTree {
        return this.authService.loggedInUser.pipe(take(1),map(user=>{
            const isAuth= !!user
            if(isAuth)
            {
                console.log("USEE IS AUTHENTICATED")
                return true
            }
           
           this.router.navigate(['/login'])

            return false
        }))
        
    }

}