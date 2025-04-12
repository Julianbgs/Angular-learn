import { Routes } from '@angular/router';
import {authGuard} from '../core/guards/auth.guard';
import {CardsComponent} from './cards/cards.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'cards',
    canActivate: [authGuard],
    component: CardsComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
