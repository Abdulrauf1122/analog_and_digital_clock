// DOM Elements
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalTime = document.getElementById('digital-time');
const dateDisplay = document.getElementById('date-display');
const clockMarkings = document.getElementById('clock-markings');
const hourNumbers = document.getElementById('hour-numbers');

// Create Clock Markings
function createClockMarkings() {
  for (let i = 0; i < 60; i++) {
    const mark = document.createElement('div');
    mark.classList.add('clock-mark');
    if (i % 5 === 0) {
      mark.style.height = '20px';
      mark.style.background = '#f39c12';
    } else {
      mark.classList.add('minute');
    }
    mark.style.transform = `rotate(${i * 6}deg)`;
    clockMarkings.appendChild(mark);
  }
}

// Create Hour Numbers
function createHourNumbers() {
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement('div');
    number.classList.add('hour-number');

    // Calculate positions using trigonometry
    const angle = (i * 30 - 90) * (Math.PI / 180); // Convert to radians (-90° offset for alignment)
    const x = Math.cos(angle) * 140; // Adjust radius
    const y = Math.sin(angle) * 140;

    number.style.transform = `translate(${x}px, ${y}px)`;
    number.textContent = i;

    // Append the number to the clock face
    hourNumbers.appendChild(number);
  }
}

// Update Time Function
function updateTime() {
  const now = new Date();

  // Analog Clock
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 - 90; // Offset by -90 for alignment
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 - 90; // Offset by -90 for alignment
  const secondsDegrees = (seconds / 60) * 360 - 90; // Offset by -90 for alignment

  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  // Digital Clock
  const timeString = now.toLocaleTimeString('en-US', { hour12: true });
  digitalTime.textContent = timeString;

  // Date Display
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  dateDisplay.textContent = dateString;
}

// Initialize Clock
createClockMarkings(); // Add markings to the clock
createHourNumbers(); // Add hour numbers
setInterval(updateTime, 1000);
updateTime(); // Call immediately for initial display
