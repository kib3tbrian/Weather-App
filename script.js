class WeatherApp {
    constructor() {
        // You'll need to get your own API key from OpenWeatherMap
        this.API_KEY = 'YOUR_API_KEY_HERE';
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        
        this.initializeElements();
        this.bindEvents();
        this.showDemoData(); // Show demo data since API key is needed
    }

    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');
        this.weatherCard = document.getElementById('weatherCard');
        
        // Weather card elements
        this.cityName = document.getElementById('cityName');
        this.countryName = document.getElementById('countryName');
        this.currentTime = document.getElementById('currentTime');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.description = document.getElementById('description');
        this.feelsLike = document.getElementById('feelsLike');
        this.windSpeed = document.getElementById('windSpeed');
        this.humidity = document.getElementById('humidity');
        this.visibility = document.getElementById('visibility');
        this.pressure = document.getElementById('pressure');
        this.forecast = document.getElementById('forecast');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
    }

    showLoading() {
        this.hideAllSections();
        this.loadingSpinner.classList.remove('hidden');
    }

    showError(message) {
        this.hideAllSections();
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    showWeather() {
        this.hideAllSections();
        this.weatherCard.classList.remove('hidden');
    }

    hideAllSections() {
        this.loadingSpinner.classList.add('hidden');
        this.errorMessage.classList.add('hidden');
        this.weatherCard.classList.add('hidden');
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError('Please add your OpenWeatherMap API key to use live data');
            return;
        }

        this.showLoading();

        try {
            const weatherData = await this.fetchWeatherData(city);
            const forecastData = await this.fetchForecastData(city);
            
            this.displayWeatherData(weatherData);
            this.displayForecastData(forecastData);
            this.showWeather();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('City not found. Please check the spelling and try again.');
        }
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser');
            return;
        }

        this.showLoading();

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const weatherData = await this.fetchWeatherDataByCoords(latitude, longitude);
                    const forecastData = await this.fetchForecastDataByCoords(latitude, longitude);
                    
                    this.displayWeatherData(weatherData);
                    this.displayForecastData(forecastData);
                    this.showWeather();
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    this.showError('Unable to fetch weather data for your location');
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                this.showError('Unable to access your location. Please search for a city instead.');
            }
        );
    }

    async fetchWeatherData(city) {
        const response = await fetch(
            `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        
        return await response.json();
    }

    async fetchForecastData(city) {
        const response = await fetch(
            `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Forecast data not found');
        }
        
        return await response.json();
    }

    async fetchWeatherDataByCoords(lat, lon) {
        const response = await fetch(
            `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        
        return await response.json();
    }

    async fetchForecastDataByCoords(lat, lon) {
        const response = await fetch(
            `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Forecast data not found');
        }
        
        return await response.json();
    }

    displayWeatherData(data) {
        // Update location info
        this.cityName.textContent = data.name;
        this.countryName.textContent = data.sys.country;
        this.currentTime.textContent = this.formatDateTime(new Date());

        // Update weather icon
        const iconCode = data.weather[0].icon;
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        this.weatherIcon.alt = data.weather[0].description;

        // Update temperature
        this.temperature.textContent = Math.round(data.main.temp);
        this.description.textContent = data.weather[0].description;
        this.feelsLike.textContent = Math.round(data.main.feels_like);

        // Update weather details
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
    }

    displayForecastData(data) {
        // Get daily forecasts (every 24 hours)
        const dailyForecasts = this.processForecastData(data.list);
        
        this.forecast.innerHTML = '';
        
        dailyForecasts.forEach(forecast => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            
            forecastItem.innerHTML = `
                <div class="forecast-day">${forecast.day}</div>
                <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" 
                     alt="${forecast.description}" class="forecast-icon">
                <div class="forecast-temps">
                    <span class="forecast-high">${forecast.high}°</span>
                    <span class="forecast-low">${forecast.low}°</span>
                </div>
            `;
            
            this.forecast.appendChild(forecastItem);
        });
    }

    processForecastData(forecastList) {
        const dailyData = {};
        
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            if (!dailyData[day]) {
                dailyData[day] = {
                    day,
                    temps: [],
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                };
            }
            
            dailyData[day].temps.push(item.main.temp);
        });
        
        return Object.values(dailyData).slice(0, 5).map(day => ({
            ...day,
            high: Math.round(Math.max(...day.temps)),
            low: Math.round(Math.min(...day.temps))
        }));
    }

    formatDateTime(date) {
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Demo data for portfolio demonstration
    showDemoData() {
        const demoWeatherData = {
            name: "London",
            sys: { country: "GB" },
            weather: [
                {
                    description: "partly cloudy",
                    icon: "02d"
                }
            ],
            main: {
                temp: 18,
                feels_like: 16,
                humidity: 65,
                pressure: 1013
            },
            wind: {
                speed: 3.5
            },
            visibility: 10000
        };

        const demoForecastData = {
            list: [
                {
                    dt: Date.now() / 1000,
                    main: { temp: 18 },
                    weather: [{ icon: "02d", description: "partly cloudy" }]
                },
                {
                    dt: (Date.now() / 1000) + 86400,
                    main: { temp: 22 },
                    weather: [{ icon: "01d", description: "clear sky" }]
                },
                {
                    dt: (Date.now() / 1000) + 172800,
                    main: { temp: 15 },
                    weather: [{ icon: "10d", description: "light rain" }]
                },
                {
                    dt: (Date.now() / 1000) + 259200,
                    main: { temp: 20 },
                    weather: [{ icon: "03d", description: "scattered clouds" }]
                },
                {
                    dt: (Date.now() / 1000) + 345600,
                    main: { temp: 17 },
                    weather: [{ icon: "04d", description: "broken clouds" }]
                }
            ]
        };

        this.displayWeatherData(demoWeatherData);
        this.displayForecastData(demoForecastData);
        this.showWeather();
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});