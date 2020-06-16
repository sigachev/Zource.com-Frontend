import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {Role} from './models/role';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {AdminHeaderComponent} from './admin/layout/header/admin-header.component';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'client-user-management';
  currentUser: User;
  @ViewChild(AdminHeaderComponent, {static: false})
  private adminHeader: AdminHeaderComponent;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  logOut() {
    this.authService.logOut();
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

  isAdminSection() {
    return this.router.url.startsWith('/admin');
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
