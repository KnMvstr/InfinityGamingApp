import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Components/user/User/user.component';
import { ReviewComponent } from './Components/Review/review.component';
import { PublisherComponent } from './Components/Publisher/publisher.component';
import { PlatformComponent } from './Components/Platform/platform.component';
import { GenreComponent } from './Components/Genre/genre.component';
import { ClassificationComponent } from './Components/Classification/classification.component';
import { BusinessmodelComponent } from './Components/BusinessModel/businessmodel.component';
import { GameComponent } from './Components/Game/game.component';
import { GameDetailComponent} from './Components/Game/GameDetails/game-detail.component';
import { LoginComponent } from './Components/Login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './Components/Home/home.component';
import { RegistrationComponent } from './Components/Registration/registration.component';

const routes: Routes = [
  { path: '',   redirectTo: '', pathMatch: 'full' }, // redirect to `users-component` if the path is empty. This is the default path. 
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path : "login" , component : LoginComponent},
  {path : "users" , component : UserComponent, canActivate:[AuthGuard]},
  {path : "reviews" , component : ReviewComponent, canActivate:[AuthGuard]},
  {path : "publishers" , component : PublisherComponent, canActivate:[AuthGuard]},
  {path : "platforms" , component : PlatformComponent, canActivate:[AuthGuard]},
  {path : "genres" , component : GenreComponent, canActivate:[AuthGuard]},
  {path : "classifications" , component : ClassificationComponent, canActivate:[AuthGuard]},
  {path : "businessmodels", component : BusinessmodelComponent, canActivate:[AuthGuard]},
  {path : "games", component : GameComponent, canActivate:[AuthGuard]},
  { path: 'game-detail/:id', component: GameDetailComponent },
  {path : "home", component : HomeComponent},
  {path : "register", component : RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
