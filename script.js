document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // Update the location display with city and country
    const locationDisplay = document.getElementById('locationDisplay');
    locationDisplay.textContent = `${city}, ${country}`;

    const url = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prayerTimesDiv = document.getElementById('prayerTimes');
            prayerTimesDiv.innerHTML = '';  // Clear previous results
            const timings = data.data[0].timings;  // Assuming you want the current day's timings

            // Define keys to exclude
            const excludedKeys = ['Imsak', 'Midnight', 'Firstthird', 'Lastthird'];

            for (const [key, value] of Object.entries(timings)) {
                if (!excludedKeys.includes(key)) {
                    const formattedTime = formatPrayerTime(value);
                    const timeP = document.createElement('p');
                    // Make the prayer time label bold
                    timeP.innerHTML = `<span class="prayer-label">${key}:</span> ${formattedTime}`;
                    prayerTimesDiv.appendChild(timeP);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
});

function formatPrayerTime(timeStr) {
    // Remove any timezone information and format in 12-hour notation
    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    
    // Convert hours to 12-hour format and set AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    // Construct and return the formatted time string
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}
