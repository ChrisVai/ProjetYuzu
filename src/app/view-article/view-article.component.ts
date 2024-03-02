import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {Article} from "../models/article";
import {AsyncPipe, NgClass, NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-view-article',
  standalone: true,
  imports: [
    HeaderComponent,
    NgOptimizedImage,
    RouterLink,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewArticleComponent {

  articleManager: ArticleService = inject(ArticleService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  articles$: Observable<Article[]> = this.articleManager.getArticlesById(this.getIdFromRouteParams())

  getIdFromRouteParams():number {
    let id:number =0;
    this._route.params.subscribe(params => {id = +params["id"]})
    return id
  }
}
