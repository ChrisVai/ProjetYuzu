import {ChangeDetectionStrategy, Component, inject, Input, input} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterLink} from "@angular/router";
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
  article$?: Observable<Article[]>;
  @Input() set id(articleId: number) {
    this.article$ = this.articleManager.getArticlesById(articleId)
  }
}
