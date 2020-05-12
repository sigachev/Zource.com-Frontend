import { Component } from '@angular/core';
import {FrontendLayoutComponent} from '../layout/frontend-layout.component';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public pageTitle = 'Welcome';

  constructor(layout: FrontendLayoutComponent) {
    layout.displayBreadcrumb = false;
    layout.displayHomeSlider = true;
  }

}

