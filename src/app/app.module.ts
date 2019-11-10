import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';


import { MovieService } from './services/movie.service';
import { LoaderService } from './components/loader/loader.service';

import { AppComponent } from './components/app/app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomeComponent } from './components/home/home.component';
import { TabComponent } from './components/tab/tab.component';
import { TabsComponent } from './components/tab/tabs.components';
import { MovieDetailFeedComponent } from './components/movie-details/movie-detail-feed/movie-detail-feed.component';
import { LoaderInterceptor } from './components/loader/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    HomeComponent,
    MovieDetailsComponent,
    TabComponent,
    TabsComponent,
    MovieDetailFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MovieService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
