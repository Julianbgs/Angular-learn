import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import { ApiService } from '../core/services/api.service';
import {CommonModule} from '@angular/common';
import {CardsComponent} from './cards/cards.component';
import {PostCard} from '../core/interfaces/post-card';
import {CardsPaginationService} from '../core/services/cards-pagination.service';
import {LoginComponent} from './login/login.component';
import {AuthService} from '../core/services/auth.service';
import {User} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    CardsComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-cli';
  data: PostCard[] = [];
  currentUser$: Observable<User | null>;

  constructor(
    private apiService: ApiService,
    private paginationService: CardsPaginationService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.apiService.getApiTools('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res: PostCard[]) => {
      this.paginationService.cardsData$.next(res);
      this.paginationService.getPaginationPage(1)
    })
  }
}
