import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  template: `
      <div class="container-fluid my-4 text-center">
          <img src="./assets/img/404.jpg" alt="404" width="250" class="img-fluid rounded-circle mb-3 img-thumbnail border-info">
          <h2><span class="text-danger">Oops!</span> Error 404 page not found</h2>
          <p>The page you were looking for doesn't exist.</p>
          <a href="javascript:history.back()" class="btn btn-danger has-icon"><i class="material-icons">chevron_left</i> Go back</a>
      </div>
  `
})
export class PageNotFoundComponent {
  // inject location into component constructor
  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
