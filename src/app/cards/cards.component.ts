import {Component, Input} from '@angular/core';
import {PostCard} from '../../core/interfaces/post-card';
import {CommonModule} from '@angular/common';
import {CardsPaginationService} from '../../core/services/cards-pagination.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  pageNumber = 1;

  constructor(
    public paginationService: CardsPaginationService
  ) {
  }

  prevPaginationPage(page: number) {
    if(this.pageNumber < 1) return
    this.pageNumber = this.pageNumber - 1
    this.paginationService.paginationData$.next(this.paginationService.getPaginationPage(this.pageNumber))
  }

  nextPaginationPage(page: number) {
    this.pageNumber = this.pageNumber + 1
    this.paginationService.paginationData$.next(this.paginationService.getPaginationPage(this.pageNumber))
  }
}
