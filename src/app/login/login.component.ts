import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {CardsPaginationService} from '../../core/services/cards-pagination.service';
import {AuthService} from '../../core/services/auth.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  circles: any[] = [];

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.generateCircles();
  }

  generateCircles() {
    for (let i = 0; i < 10; i++) {
      this.circles.push({
        'left': `${Math.random() * 100}%`,
        'width': `${Math.random() * 20 + 10}px`,
        'height': `${Math.random() * 20 + 10}px`,
        'animation-delay': `${Math.random() * 5}s`,
        'animation-duration': `${Math.random() * 20 + 10}s`
      });
    }
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe();
  }
}
