import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PostCard} from '../interfaces/post-card';

@Injectable({
  providedIn: 'root'
})
export class CardsPaginationService {
  public cardsData$: BehaviorSubject<PostCard[]> = new BehaviorSubject<PostCard[]>([]);
  public paginationData$: BehaviorSubject<PostCard[]> = new BehaviorSubject<PostCard[]>([]);

  getPaginationPage(page: number): PostCard[] {
    return this.cardsData$.value.slice(((page * 10) - 10), page * 10)
  }

}
