// /public/script.js

// Predefined event dates (in UTC format)
const predefinedEvents = {
    "New Year": "2025-01-01T00:00:00Z",
    "Valentine's Day": "2025-02-14T00:00:00Z",
    "Halloween": "2025-10-31T00:00:00Z",
    "Christmas": "2025-12-25T00:00:00Z"
};

// Function to update the countdown display
function updateCountdown(eventDate) {
    const now = new Date();
    const distance = new Date(eventDate) - now;

    if (distance <= 0) {
        document.getElementById('countdown').innerText = "Event has started!";
        alert("Your event is here!"); // Pop-up message
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to start the countdown once the "Start Countdown" button is clicked
function startCountdown(eventName, eventDate) {
    // Enable the countdown display
    document.getElementById('countdown').innerText = `Starting countdown for: ${eventName}`;
    
    // Update the countdown every second
    setInterval(() => updateCountdown(eventDate), 1000);
}

// Function to start predefined event countdown
function startPredefinedEvent(eventName) {
    const eventDate = predefinedEvents[eventName];
    if (eventDate) {
        startCountdown(eventName, eventDate);
    } else {
        alert('Error: Event not found!');
    }
}

// Event listener for the "Start Countdown" button
document.getElementById('start-countdown').addEventListener('click', () => {
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (eventName && eventDate) {
        startCountdown(eventName, eventDate);
    } else {
        alert('Please provide both event name and date!');
    }
});

// Enable the "Start Countdown" button once both the name and date are provided
document.getElementById('event-name').addEventListener('input', enableStartButton);
document.getElementById('event-date').addEventListener('input', enableStartButton);

function enableStartButton() {
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    const startButton = document.getElementById('start-countdown');
    if (eventName && eventDate) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

// Remove "Today" option from the date input
function removeTodayOption() {
    const dateInput = document.getElementById('event-date');
    const today = new Date().toISOString().slice(0, 16); // Current date and time (YYYY-MM-DDTHH:MM)
    dateInput.setAttribute('min', today); // Prevent selecting today as event date
}

// Initialize the button as disabled when page loads
window.onload = function() {
    document.getElementById('start-countdown').disabled = true;
};
