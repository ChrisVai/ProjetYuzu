import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../models/article";
import {combineLatest, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private articlesUrl = "https://examsdv.gzc-labs.com/articles/";
  private _http: HttpClient = inject(HttpClient);

  constructor() {
  }

  fetchArticles(): Observable<Article[]> {
    return this._http.get<Article[]>(this.articlesUrl)
  }

  getArticlesById(id:number): Observable<Article[]> {
    return this.fetchArticles().pipe(map((articles => articles.filter(article => article.id == id))))
  }

  getFilteredArticles(searchArticle: Observable<any>, categoryFilter: Observable<any>): Observable<Article[]> {

    const articles$: Observable<Article[]> = this.fetchArticles();
    const search$ = combineLatest([searchArticle, categoryFilter])

    return combineLatest([articles$,search$]).pipe(
      map(([articles, [research,categoryFilter]]) => articles.filter(article => {
        const researchMatching = article.title.toLowerCase().includes(research.toLowerCase());
        const categoryFilterMatching = article.category.toLowerCase().includes(categoryFilter.toLowerCase());

        return researchMatching && categoryFilterMatching;
      }))
    )
  }
}
