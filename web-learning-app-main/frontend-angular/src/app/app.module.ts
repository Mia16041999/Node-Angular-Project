import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashCardFormComponent } from './components/FlashCardForm/FlashCardForm';
import { FlashCardListComponent } from './components/FlashCardList/FlashCardList';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
 
 

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent,FlashCardListComponent,FlashCardFormComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule,FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
