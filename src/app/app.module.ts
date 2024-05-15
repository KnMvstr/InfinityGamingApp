import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './Components/user/User/user.component';
import { ReviewComponent } from './Components/Review/review.component';
import { PublisherComponent } from './Components/Publisher/publisher.component';
import { PlatformComponent } from './Components/Platform/platform.component';
import { GenreComponent } from './Components/Genre/genre.component';
import { ClassificationComponent } from './Components/Classification/classification.component';
import { BusinessmodelComponent } from './Components/BusinessModel/businessmodel.component';
import { GameComponent } from './Components/Game/game.component';
import { LoginComponent } from './Components/Login/login.component';
import { HomeComponent } from './Components/Home/home.component';
import { CommonModule } from '@angular/common';
import { GameDetailComponent } from './Components/Game/GameDetails/game-detail.component';
import { SearchBarComponent } from './Components/SearchBar/search-bar.component';
import { EntityDisplayPipe } from './Pipe/entity-display.pipe';
import { RegistrationComponent } from './Components/Registration/registration.component';




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ReviewComponent,
    PublisherComponent,
    PlatformComponent,
    GenreComponent,
    ClassificationComponent,
    BusinessmodelComponent,
    GameComponent,
    LoginComponent,
    HomeComponent,
    GameDetailComponent,
    SearchBarComponent,
    EntityDisplayPipe,
    RegistrationComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap:
    [AppComponent]
})
export class AppModule { }
