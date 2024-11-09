// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.static('public'));

// Store event data
let event = {
    name: 'Default Event',
    date: '2024-12-31T00:00:00Z', // Default event date
};

// Endpoint to get the current event data
app.get('/api/event', (req, res) => {
    res.json(event);
});

// Endpoint to set the event data from the frontend
app.post('/api/event', (req, res) => {
    const { name, date } = req.body;
    if (name && date) {
        event = { name, date };
        res.status(200).json({ message: 'Event updated successfully' });
    } else {
        res.status(400).json({ message: 'Invalid event data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
