import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FlashCardListComponent} from './components/FlashCardList/FlashCardList'; // Adjust the path as needed
import { FlashCardFormComponent } from './components/FlashCardForm/FlashCardForm'; // Adjust the path as needed

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flashcards', component: FlashCardListComponent }, // List route
  { path: 'add-flashcard', component: FlashCardFormComponent }, // Add route
  { path: 'edit-flashcard/:id', component: FlashCardFormComponent }, // Edit route
  { path: 'delete-flashcard/:id', component: FlashCardFormComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
