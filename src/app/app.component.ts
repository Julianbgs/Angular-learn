import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-cli';
  data: any = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getApiTools('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
      this.data = res;
    })
  }
}
