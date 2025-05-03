import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { CardsComponent } from './cards/cards.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Перенаправляем на login, если пользователь не авторизован
    pathMatch: 'full'
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
    path: 'cards',
    canActivate: [authGuard],  // Только для авторизованных
    component: CardsComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],  // Только для авторизованных
    component: DashboardComponent
  },
  {
    path: '**',  // Опционально: перехват несуществующих путей
    redirectTo: 'login'
  }
];
