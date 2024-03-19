document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const locationDisplay = document.getElementById('locationDisplay');
   
    locationDisplay.textContent = `Prayer Times in ${city}, ${country}`;


    const url = `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2`;
    const prayerTimesDiv = document.getElementById('prayerTimes');
    prayerTimesDiv.style.display = 'none';  // Hide the div initially

    fetch(url)
        .then(response => response.json())
        .then(data => {
            prayerTimesDiv.innerHTML = '';  // Clear previous results
            const timings = data.data[0].timings;

            // Define keys to exclude
            const excludedKeys = ['Imsak', 'Midnight', 'Firstthird', 'Lastthird'];

            for (const [key, value] of Object.entries(timings)) {
                if (!excludedKeys.includes(key)) {
                    const formattedTime = formatPrayerTime(value);
                    const timeP = document.createElement('p');
                    timeP.innerHTML = `<span class="prayer-label">${key}:</span> ${formattedTime}`;
                    prayerTimesDiv.appendChild(timeP);
                }
            }
            prayerTimesDiv.style.display = 'flex';  // Make the div visible after loading the content
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
});

function formatPrayerTime(timeStr) {
    let [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

    const period = modifier.includes('PM') ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

function updateDateTime() {
    const currentDateElem = document.getElementById('currentDate');
    const currentTimeElem = document.getElementById('currentTime');

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElem.textContent = now.toLocaleDateString('en-US', options);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    currentTimeElem.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

updateDateTime();
setInterval(updateDateTime, 1000);
