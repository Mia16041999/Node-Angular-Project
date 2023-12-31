import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardService } from 'src/app/services/FlashCardService';
import { Flashcard } from 'src/app/models/FlashCard';

@Component({
  selector: 'app-flashcard-list',
  templateUrl: './FlashCardList.html',
  styleUrls: ['./FlashCardList.scss'],
  
})
export class FlashCardListComponent implements OnInit {
  flashcards: Flashcard[] = [];

  constructor(
    private flashcardService: FlashcardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFlashcards();
  }

  loadFlashcards() {
    this.flashcardService.getFlashcards().subscribe((data) => {
      this.flashcards = data;
    });
  }

  navigateToAdd() {
    this.router.navigate(['/add-flashcard']); // Adjust the route as per your routing configuration
  }

  navigateToEdit(flashcardId: number | undefined) {
    if (flashcardId !== undefined) {
      this.router.navigate(['/edit-flashcard', flashcardId]);
    }
  }
  
  deleteFlashcard(flashcardId: number | undefined) {
    if (flashcardId !== undefined && confirm('Are you sure you want to delete this flashcard?')) {
      this.flashcardService.deleteFlashcard(flashcardId).subscribe(() => {
        this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardId);
      });
    }
  }
}
