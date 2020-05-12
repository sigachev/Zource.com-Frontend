import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
@Component({
/*  templateUrl: './pages.component.html',*/
  template:  './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  private pageFileName;
  htmlStr  = '<strong>The Tortoise</strong> &amp; the Hare';


  constructor(private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.pageFileName = './' + this.route.snapshot.data.page + '.html';
  }


}
