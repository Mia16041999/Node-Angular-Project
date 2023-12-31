import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { throwError ,Observable } from 'rxjs';
import { Flashcard } from '../models/FlashCard';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FlashcardService {
    private apiUrl = 'http://localhost:3000/flashcards'; // Update this URL to match your backend

    flashcard: Flashcard = new Flashcard();
    editMode: boolean = false;
    flashcards: Flashcard[] = [];

    constructor(private http: HttpClient) {}

    getFlashcards(): Observable<Flashcard[]> {
        console.log('Sending GET request to:', this.apiUrl);
        return this.http.get<Flashcard[]>(this.apiUrl).pipe(
            tap((data) => {
                console.log('Received flashcards data:', data);
            }),
            catchError((error) => {
                console.error('Error fetching flashcards:', error);
                throw error;
            })
        );
    }

    // Other methods...




  getFlashcardById(id: number): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.apiUrl}/${id}`);
  }

  createFlashcard(newFlashcard: Flashcard): Observable<Flashcard> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<Flashcard>(this.apiUrl, newFlashcard, httpOptions)
      .pipe(
        tap((createdFlashcard) => {
          console.log('Flashcard created:', createdFlashcard);
          this.flashcards.push(createdFlashcard);
        }),
        catchError((error) => {
          console.error('Error creating flashcard:', error);
          return throwError(error); // Rethrow the error to handle it in the component
        })
      );
  }

  updateFlashcard(id: number, updatedFlashcard: Flashcard): Observable<Flashcard> {
    return this.http.put<Flashcard>(`${this.apiUrl}/${id}`, updatedFlashcard).pipe(
      tap((updated) => {
        const index = this.flashcards.findIndex((f) => f.id === id);
        if (index !== -1) {
          this.flashcards[index] = updated; // Update the flashcard in the array
        }
      }),
      catchError((error) => {
        console.error('Error updating flashcard:', error);
        throw error;
      })
    );
  }

  deleteFlashcard(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.flashcards = this.flashcards.filter((f) => f.id !== id); // Remove the flashcard from the array
      }),
      catchError((error) => {
        console.error('Error deleting flashcard:', error);
        throw error;
      })
    );
  }

  // ... other methods as needed ...
}
