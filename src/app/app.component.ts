import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: any;

    constructor(
      private router: Router,
      private userService: UserService
    ) {
      this.userService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
}
