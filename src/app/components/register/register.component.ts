import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {FrontendLayoutComponent} from '../../layout/frontend-layout.component';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string;


  constructor(layout: FrontendLayoutComponent,
              private authService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
    layout.displayBreadcrumb = true;
    layout.displayHomeSlider = false;
  }


  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.userService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      this.errorMessage = 'Username is already exist.';
    });
  }

}
