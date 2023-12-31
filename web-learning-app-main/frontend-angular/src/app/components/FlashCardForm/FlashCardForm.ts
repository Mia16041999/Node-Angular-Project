import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from 'src/app/services/FlashCardService';
import { Flashcard } from 'src/app/models/FlashCard';

@Component({
    selector: 'app-flashcard-form',
    templateUrl: './FlashCardForm.html',
    styleUrls: ['./FlashCardForm.scss'],
})
export class FlashCardFormComponent implements OnInit {
    flashcard: Flashcard = new Flashcard(); // Initialize here
    editMode: boolean = false;
    flashcards: Flashcard[] = []; // Array to hold flashcards

    constructor(
        private flashcardService: FlashcardService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = parseInt(params['id'], 10);
            if (!isNaN(id)) {
                this.editMode = true;
                this.flashcardService.getFlashcardById(id).subscribe(data => {
                    this.flashcard = data;
                }, error => {
                    console.error('Error fetching flashcard:', error);
                });
            } else {
                this.editMode = false;
                this.flashcard = new Flashcard();
                this.fetchFlashcards(); // Load existing flashcards when adding a new one
            }
        });
    }
    
    saveFlashcard() {
        if (this.editMode && this.flashcard.id != null) { // Check if id is not null
            this.flashcardService.updateFlashcard(this.flashcard.id, this.flashcard).subscribe(() => {
                // Logic after updating the flashcard
            });
        } else {
            this.flashcardService.createFlashcard(this.flashcard).subscribe((newCard) => {
                this.flashcards.push(newCard);
                this.flashcard = new Flashcard(); // Reset the form after adding
            });
        }
    }

    editFlashcard(id: number) {
        if (id !== undefined) {
            this.flashcardService.getFlashcardById(id).subscribe((data) => {
                this.flashcard = data;
                this.editMode = true;
            }, error => {
                console.error('Error fetching flashcard:', error);
            });
        }
    }
    
    
    deleteFlashcard(id: number) {
        if (id !== undefined) {
            const existingCardIndex = this.flashcards.findIndex((card) => card.id === id);
            if (existingCardIndex !== -1) {
                this.flashcardService.deleteFlashcard(id).subscribe(() => {
                    this.flashcards.splice(existingCardIndex, 1);
                });
            } else {
                console.error('Flashcard not found');
            }
        }
    }
    
    private fetchFlashcards() {
        this.flashcardService.getFlashcards().subscribe((data) => {
            console.log('Received flashcards:', data);
            this.flashcards = data;
        });
    }
}
