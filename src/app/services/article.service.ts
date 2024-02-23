import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../models/article";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private articlesUrl = "https://examsdv.gzc-labs.com/articles/";
  private _http: HttpClient = inject(HttpClient);
  constructor() {
    this.fetchArticles()
  }

  fetchArticles(): Observable<Article[]> {
    return this._http.get<Article[]>(this.articlesUrl)
  }

  getArticlesById(id:number): Observable<Article[]> {
    return this.fetchArticles().pipe(map((articles => articles.filter(article => article.id == id))))
  }
}
