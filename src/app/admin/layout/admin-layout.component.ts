import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NavService} from './sidenav/nav.service.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements AfterViewInit {
  @ViewChild('appDrawer', { static: false }) appDrawer: ElementRef;
  currentUser: User;

  constructor(private navService: NavService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }


  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
