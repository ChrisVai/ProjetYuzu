import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private url = "https://examsdv.gzc-labs.com/articles/";
  private _http: HttpClient = inject(HttpClient);
  articles = signal<Article[]>([]);
  constructor() {
    this._fetchArticles()
  }

  private _fetchArticles() {
    this._http.get<Article[]>(this.url)
      .subscribe(articles => {this.articles.update(() => articles)})
  }
}
