import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ViewArticleComponent} from "./view-article/view-article.component";
import {WelcomeComponent} from "./welcome/welcome.component";

export const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'viewArticle/:id', component: ViewArticleComponent}
];
