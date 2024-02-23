import {Component, inject} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {AsyncPipe, NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {combineLatest, isEmpty, map, Observable, startWith} from "rxjs";
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
  styleUrl: './welcome.component.css'
})

export class WelcomeComponent {

  private articleManager: ArticleService = inject(ArticleService);
  private formBuilder: FormBuilder = inject(FormBuilder)
  search = this.formBuilder.nonNullable.group({
    searchArticle: [''],
    categoryFilter: ['']
  })
  articles$: Observable<Article[]> = this.getFilteredArticles()

  private getFilteredArticles(): Observable<Article[]> {

    const articles$: Observable<Article[]> = this.articleManager.fetchArticles();
    const search$ = combineLatest([
      this.search.controls.searchArticle.valueChanges.pipe(startWith('')),
      this.search.controls.categoryFilter.valueChanges.pipe(startWith(''))
    ])

    return combineLatest([articles$,search$]).pipe(
      map(([articles, [research,categoryFilter]]) => articles.filter(article => {
        const researchMatching = article.title.toLowerCase().includes(research.toLowerCase());
        const categoryFilterMatching = article.category.toLowerCase().includes(categoryFilter.toLowerCase());

        return researchMatching && categoryFilterMatching;
      }))
    )
  }

  isEmpty(param: Observable<any[]>): Observable<boolean>{
    return param.pipe(isEmpty())
  }
}
