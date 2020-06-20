import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../models/user';
import {Role} from '../models/role';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  /* selector: 'app-frontend',*/
  templateUrl: './frontend-layout.component.html',
  styleUrls: ['./frontend-layout.component.css']
})
export class FrontendLayoutComponent implements OnInit {
  currentUser: User;
  public displayBreadcrumb = true;
  public displayHomeSlider = false;

  constructor(private authService: AuthenticationService,
              public router: Router,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit() {
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

  logOut() {
    this.authService.logOut();
  }

}
