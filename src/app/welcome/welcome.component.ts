import {Component, inject} from '@angular/core';
import {ArticleService} from "../services/article.service";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    HeaderComponent,
    NgClass
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private articleService: ArticleService = inject(ArticleService);
  private router: Router = inject(Router)
    articles = this.articleService.articles;
}
