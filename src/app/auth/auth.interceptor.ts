import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (sessionStorage.getItem('userToken') != null) {
          //console.log("itt");
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + sessionStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .do(
                succ => { },
                err => {
                    if (err.status === 401)
                        this.router.navigateByUrl('/login');
                }
                );
        }

      return next.handle(req);
    }
}
