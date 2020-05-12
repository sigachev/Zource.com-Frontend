import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
  /*  encapsulation: ViewEncapsulation.None*/ /*  applies css style to all other components  */
})
export class AdminHeaderComponent implements OnInit {
  currentUser: User;
  @Output() toggleSidebar = new EventEmitter();

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }


  ngOnInit() {
  }

  /*  onToggleSidebar() {
      this.toggleSidebar.emit();
    }*/

  logOut() {
    this.authService.logOut();

  }

}
