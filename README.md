# Weather App Portfolio Project

A modern, responsive weather application built with vanilla JavaScript, HTML, and CSS. This project demonstrates clean code architecture, API integration, and modern web development practices.

## 🌟 Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **5-Day Forecast**: View upcoming weather predictions
- **Geolocation Support**: Use current location to get local weather
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Error Handling**: Comprehensive error handling for various scenarios

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenWeatherMap API
- **Design**: CSS Grid, Flexbox, CSS Animations
- **Responsive**: Mobile-first approach

## 📱 Features Showcase

### Current Weather Display
- City name and country
- Current temperature with "feels like" temperature
- Weather description and icon
- Wind speed, humidity, visibility, and pressure

### 5-Day Forecast
- Daily high and low temperatures
- Weather icons and descriptions
- Easy-to-read grid layout

### User Experience
- Search by city name
- Use current location (with geolocation API)
- Loading states and error handling
- Smooth animations and transitions

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd weather-app
   ```

2. **Get OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

3. **Configure API Key**
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   this.API_KEY = 'your_actual_api_key_here';
   ```

4. **Run the Application**
   - Open `index.html` in your browser
   - Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## 🎨 Design Highlights

- **Modern Glassmorphism**: Translucent cards with backdrop blur effects
- **Gradient Backgrounds**: Beautiful color gradients for visual appeal
- **Micro-interactions**: Hover effects and smooth transitions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Scheme**: Carefully chosen colors for accessibility

## 📊 Code Architecture

### Class-Based Structure
```javascript
class WeatherApp {
    constructor()     // Initialize app
    bindEvents()      // Set up event listeners
    handleSearch()    // Process search requests
    fetchWeatherData() // API calls
    displayWeatherData() // Update UI
}
```

### Key Methods
- `handleSearch()`: Processes user input and fetches weather data
- `getCurrentLocation()`: Uses geolocation API for location-based weather
- `displayWeatherData()`: Updates the UI with fetched data
- `showDemoData()`: Displays sample data for demonstration

## 🔧 API Integration

The app integrates with OpenWeatherMap API endpoints:
- Current Weather: `/weather`
- 5-Day Forecast: `/forecast`
- Supports both city name and coordinates

## 📱 Responsive Design

- **Desktop**: Full-width layout with grid-based forecast
- **Tablet**: Adapted spacing and font sizes
- **Mobile**: Single-column layout, touch-friendly buttons

## 🚀 Performance Features

- **Efficient API Calls**: Minimal requests with proper error handling
- **Smooth Animations**: CSS transitions for better UX
- **Loading States**: Visual feedback during data fetching
- **Error Boundaries**: Graceful error handling and user feedback

## 🎯 Portfolio Highlights

This project demonstrates:
- **API Integration**: Real-world API usage with error handling
- **Modern JavaScript**: ES6+ features, async/await, classes
- **Responsive Design**: Mobile-first, cross-device compatibility
- **User Experience**: Loading states, error handling, smooth interactions
- **Code Organization**: Clean, maintainable code structure
- **Modern CSS**: Grid, Flexbox, animations, and modern properties

## 🔮 Future Enhancements

- Weather maps integration
- Historical weather data
- Weather alerts and notifications
- Multiple location favorites
- Dark/light theme toggle
- Weather charts and graphs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This is a portfolio demonstration project. To use with live data, you'll need to obtain your own OpenWeatherMap API key.