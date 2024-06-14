const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // Change port number if needed

const db = new sqlite3.Database('appointments.db');

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle appointment booking
app.post('/bookAppointment', (req, res) => {
    const { appointmentTime } = req.body;

    if (!appointmentTime) {
        return res.status(400).json({ message: 'Appointment time is required' });
    }

    const query = `INSERT INTO appointments (appointmentTime) VALUES (?)`;
    db.run(query, [appointmentTime], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving appointment' });
        }

        res.status(200).json({ message: 'Appointment booked successfully', id: this.lastID });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
document.getElementById('bookButton').addEventListener('click', function() {
    // Example AJAX request to backend endpoint
    fetch('/bookAppointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointmentTime: '2024-03-23 10:00 AM' }) // Example data
    })
    .then(response => {
        if (response.ok) {
            alert('Appointment booked successfully!');
        } else {
            alert('Failed to book appointment. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
