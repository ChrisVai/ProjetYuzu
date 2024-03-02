import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {AsyncPipe, NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {Observable, startWith} from "rxjs";
import {Article} from "../models/article";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    HeaderComponent,
    NgClass,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WelcomeComponent {

  private _formBuilder: FormBuilder = inject(FormBuilder)
  articleManager: ArticleService = inject(ArticleService);
  search = this._formBuilder.nonNullable.group(
    {searchArticle: [''],
      categoryFilter: ['']
    })
  articles$: Observable<Article[]> = this.articleManager.getFilteredArticles(
    this.search.controls.searchArticle.valueChanges.pipe(startWith('')),
    this.search.controls.categoryFilter.valueChanges.pipe(startWith(''))
  )
}
