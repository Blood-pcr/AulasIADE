const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');

function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('pt-PT', options);
    dateDisplay.textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);
