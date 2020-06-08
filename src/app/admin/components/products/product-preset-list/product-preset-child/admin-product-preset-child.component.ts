import {Component, Input, OnInit} from '@angular/core';
import {ProductPreset} from '../../../../../models/product-preset';

@Component({
  selector: 'admin-product-preset-child',
  templateUrl: './admin-product-preset-child.component.html',
  styleUrls: ['./admin-product-preset-child.component.css']
})
export class AdminProductPresetChildComponent implements OnInit {

  @Input() preset: ProductPreset;

  constructor() { }

  ngOnInit(): void {
  }

}
