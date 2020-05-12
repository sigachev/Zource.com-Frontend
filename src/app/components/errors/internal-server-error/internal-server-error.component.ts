import {Component, OnInit} from '@angular/core';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent implements OnInit {

  constructor(private errorService: ErrorService) {
  }

  get errorMessage(): string {
    return this.errorService.message;
  }


  ngOnInit(): void {
  }

}
