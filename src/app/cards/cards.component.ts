import {Component, Input, OnInit} from '@angular/core';
import {PostCard} from '../../core/interfaces/post-card';
import {CommonModule} from '@angular/common';
import {CardsPaginationService} from '../../core/services/cards-pagination.service';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  pageNumber = 1;

  circles: any[] = []; // Добавляем свойство circles

  constructor(
    public paginationService: CardsPaginationService
  ) {
  }

  ngOnInit() {
    this.generateCircles(); // Генерируем круги при инициализации
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

  prevPaginationPage(page: number) {
    if(this.pageNumber <= 1) return; //]
    this.pageNumber = this.pageNumber - 1;
    this.paginationService.getPaginationPage(this.pageNumber);
  }

  nextPaginationPage(page: number) {
    this.pageNumber = this.pageNumber + 1
    this.paginationService.getPaginationPage(this.pageNumber)
  }
}
