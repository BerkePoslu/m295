document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    
    try {
        const response = await fetch(`/weather?zip=${zipcode}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        document.getElementById('weatherData').innerHTML = `<p>Temperature: ${data.temperature}</p>`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});
