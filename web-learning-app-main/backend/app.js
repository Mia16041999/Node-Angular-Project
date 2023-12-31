const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Change this to your desired port

const corsOptions = {
    origin: 'http://localhost:4200', // Replace with your frontend URL
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// In-memory storage for flashcards (replace this with a database)
let flashcards = [];
let nextId = 1; // Simple ID generator

// API endpoints
app.get('/flashcards', (req, res) => {
    console.log('GET /flashcards endpoint hit'); // Debugging statement
    if (flashcards) {
        res.json(flashcards);
    } else {
        console.error('Error: Flashcards not found'); // Debugging statement
        res.status(404).json({ error: 'Flashcards not found' });
    }
});


app.post('/flashcards', (req, res) => {
    console.log('POST /flashcards endpoint hit'); // Debugging statement
    console.log('Request Body:', req.body); // Log the request body to see what's being sent

    const newFlashcard = { id: nextId++, ...req.body };
    console.log('New Flashcard:', newFlashcard); // Log the new flashcard object
    flashcards.push(newFlashcard);
    res.status(201).json(newFlashcard);
});

app.put('/flashcards/:id', (req, res) => {
    // Extract and parse the ID from the request parameters
    const { id } = req.params;
    const flashcardId = parseInt(id, 10);

    // Find the index of the flashcard in the array
    const flashcardIndex = flashcards.findIndex(card => card.id === flashcardId);

    // Check if the flashcard exists
    if (flashcardIndex !== -1) {
        // Update the flashcard with the new data from the request body
        // This will merge the existing data with the new data
        // Any fields in req.body will overwrite existing fields in the flashcard
        flashcards[flashcardIndex] = { ...flashcards[flashcardIndex], ...req.body };

        // Send back the updated flashcard
        res.json(flashcards[flashcardIndex]);
    } else {
        // If the flashcard is not found, send a 404 response
        res.status(404).json({ error: 'Flashcard not found' });
    }
});



app.delete('/flashcards/:id', (req, res) => {
    console.log(`DELETE /delete-flashcard/:id endpoint hit with ID: ${req.params.id}`); // Debugging statement
    const { id } = req.params;

    const flashcardIndex = flashcards.findIndex((card) => card.id === parseInt(id, 10));

    if (flashcardIndex !== -1) {
        flashcards = flashcards.filter((card) => card.id !== parseInt(id, 10));
        res.status(204).send();
    } else {
        console.error('Error: Flashcard not found'); // Debugging statement
        res.status(404).json({ error: 'Flashcard not found' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
