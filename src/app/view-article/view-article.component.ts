import {Component, inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {Article} from "../models/article";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-view-article',
  standalone: true,
  imports: [
    HeaderComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './view-article.component.html',
  styleUrl: './view-article.component.css'
})
export class ViewArticleComponent implements OnInit {
  private articleManager: ArticleService = inject(ArticleService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected id: number = 0;
  articles = this.articleManager.articles


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params["id"];
    })
    console.log(this.id)
  }
}
