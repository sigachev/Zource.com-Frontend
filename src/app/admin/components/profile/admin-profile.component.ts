import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  private currentFragment: string;

  constructor(private activatedRoute: ActivatedRoute
                         ) { }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe(fragment => {
      this.currentFragment = fragment;
    });
  }

}
