document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const url = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prayerTimesDiv = document.getElementById('prayerTimes');
            prayerTimesDiv.innerHTML = '';  // Clear previous results
            const date = new Date();
            const today = date.getDate();
            const timings = data.data[today - 1].timings;

            for (const [key, value] of Object.entries(timings)) {
                const timeP = document.createElement('p');
                timeP.textContent = `${key}: ${value}`;
                prayerTimesDiv.appendChild(timeP);
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
});

function formatPrayerTime(timeStr) {
    // Remove any timezone information (e.g., " (+03)")
    timeStr = timeStr.replace(/ \(\+\d+\)/, '');

    // Extract hours and minutes
    let [hours, minutes] = timeStr.split(':').map(num => parseInt(num, 10));

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Return formatted time string
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const url = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prayerTimesDiv = document.getElementById('prayerTimes');
            prayerTimesDiv.innerHTML = '';  // Clear previous results
            const date = new Date();
            const today = date.getDate();
            const timings = data.data[today - 1].timings;

            for (const [key, value] of Object.entries(timings)) {
                const formattedTime = formatPrayerTime(value);
                const timeP = document.createElement('p');
                timeP.textContent = `${key}: ${formattedTime}`;
                prayerTimesDiv.appendChild(timeP);
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
});

document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const url = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const prayerTimesDiv = document.getElementById('prayerTimes');
            prayerTimesDiv.innerHTML = '';  // Clear previous results
            const date = new Date();
            const today = date.getDate();
            const timings = data.data[today - 1].timings;

            const excludedKeys = ['Imsak', 'Midnight', 'Firstthird', 'Lastthird'];

            for (const [key, value] of Object.entries(timings)) {
                if (!excludedKeys.includes(key)) {
                    const formattedTime = formatPrayerTime(value);
                    const timeP = document.createElement('p');
                    timeP.textContent = `${key}: ${formattedTime}`;
                    prayerTimesDiv.appendChild(timeP);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
});
