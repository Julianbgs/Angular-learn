import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import {CommonModule} from '@angular/common';
import {CardsComponent} from './cards/cards.component';
import {PostCard} from '../core/interfaces/post-card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    CardsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-cli';
  data: PostCard[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getApiTools('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
      this.data = res;
    })
  }
}
