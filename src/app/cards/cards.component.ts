import {Component, Input} from '@angular/core';
import {PostCard} from '../../core/interfaces/post-card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input('cards') public cards: PostCard[] | undefined;
}
