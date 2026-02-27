# إعداد خدام - كنيسة العذراء مريم بالزيتون (Mobile-First)
# Servants Preparation - Virgin Mary Church Zaytoun

A **mobile-first** responsive web portal for servants preparation at Virgin Mary Church in Zaytoun, optimized for smartphones with a native app-like experience and spiritual color palette inspired by Virgin Mary's icons.

## 🎨 **Spiritual Branding & Identity**

### 🏛️ **Church Identity**
- **Official Name**: إعداد خدام - كنيسة العذراء مريم بالزيتون
- **Logo Integration**: Circular church logo with golden border
- **Mobile-Optimized Header**: Centered logo and title on mobile
- **Spiritual Footer**: "إعداد خدام العذراء الزيتون - جميع الحقوق محفوظة"

### 🎨 **Virgin Mary Color Palette**
- **Light Blue** (#87CEEB): Primary color representing purity and peace
- **Powder Blue** (#B0E0E6): Secondary gradient color
- **Gold** (#FFD700): Divine accents and borders
- **White**: Clean backgrounds and readability

## 🚀 Mobile-First Features

### 📱 **Native App Experience**
- **Bottom Navigation Bar**: Easy thumb-reach navigation like modern mobile apps
- **Touch-Friendly UI**: All buttons meet 48px minimum touch target requirements
- **Responsive Layout**: Optimized for mobile screens with desktop as secondary
- **Fast Loading**: Lightweight CSS and optimized JavaScript

### 📚 **المحاضرات (Lectures) - Mobile Optimized**
- **Single-Column List**: Clean, readable cards with full lecture titles
- **Large Touch Targets**: Easy tapping without zooming
- **PDF Viewer**: Full-screen modal optimized for mobile viewing
- **Search**: Real-time search with highlighting

### 🎵 **الألحان (Hymns) - Mobile First**
- **Stacked Layout**: Image on top, audio player fixed below (mobile)
- **Side-by-Side Layout**: Image and audio player side-by-side (desktop)
- **Audio Controls**: Large play button and progress bar
- **Image Support**: `object-fit: contain` for proper aspect ratios

## 🎨 Design Features

### Mobile-First Spiritual Design
- **Base Styles**: All styles start with mobile defaults
- **Progressive Enhancement**: Desktop features added via media queries
- **Touch Interactions**: `:active` states for tactile feedback
- **Viewport Optimization**: Handles mobile browser quirks

### Spiritual UI Components
- **Bottom Navigation**: Fixed position with icons and labels
- **Sticky Search**: Always accessible at the top
- **Stats Cards**: Clean grid with light blue and gold accents
- **Modal System**: Full-screen overlays with proper mobile handling
- **Logo Integration**: Circular church logo with golden border

## Technology Stack

- **HTML5**: Semantic markup with mobile-first structure
- **Tailwind CSS**: Mobile-first utility classes + custom CSS
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Touch-friendly icons
- **Google Fonts**: Tajawal font optimized for Arabic readability

## Project Structure

```
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── README.md           # This file
├── Mo7drat/            # Lectures directory (PDF files)
│   ├── الصوم - لاهوت مقارن.pdf
│   ├── العصر الرسولي - عصر الإستشهاد.pdf
│   └── ... (other PDFs)
└── al7an/              # Hymns directory (audio and images)
    ├── أمين أمين طون ثاناطون.ogg
    ├── 1.jpg
    ├── 1.mp3
    └── ... (other audio files)
```

## Technology Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Modern utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Icons library
- **Google Fonts**: Tajawal font for Arabic typography

## Configuration

The application uses a simple configuration object in `script.js`:

```javascript
const CONFIG = {
    lecturesPath: './Mo7drat/',
    hymnsPath: './al7an/',
    supportedAudioFormats: ['.ogg', '.mp3'],
    supportedImageFormats: ['.jpg', '.jpeg', '.png']
};
```

## Deployment

### GitHub Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "root" folder
   - Click "Save"

3. **Access**: Your site will be available at `https://<username>.github.io/<repository-name>/`

### Local Development

1. **Start local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server)
   npx http-server
   ```

2. **Open browser**: Navigate to `http://localhost:8000`

## Browser Support

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Navigation
- **Sidebar Navigation**: Clean sidebar with section switching
- **Mobile Menu**: Hamburger menu for mobile devices
- **Active States**: Visual feedback for current section
- **Search Bar**: Real-time search across lectures and hymns

### Lectures Section
- **Card Layout**: Each lecture in an elegant card
- **PDF Modal**: Full-screen PDF viewer
- **Search Highlight**: Search terms highlighted in results
- **File Icons**: Visual indicators for file types

### Hymns Section
- **Audio Controls**: Play/pause, seek, time display
- **Image Display**: Show lyrics/scores alongside audio
- **Progress Bar**: Visual progress indication
- **Responsive Layout**: Split view on desktop, stacked on mobile

### UI/UX Features
- **Loading States**: Smooth transitions and loading feedback
- **Error Handling**: Graceful handling of missing files
- **Keyboard Shortcuts**: ESC to close modals
- **Touch Support**: Mobile-friendly touch interactions

## Customization

### Adding New Lectures
1. Add PDF files to the `Mo7drat/` directory
2. Update the `lectureFiles` array in `script.js`:
   ```javascript
   const lectureFiles = [
       'existing-file.pdf',
       'new-lecture.pdf'  // Add new file here
   ];
   ```

### Adding New Hymns
1. Add audio files to the `al7an/` directory
2. Add corresponding images (if available) with the same name
3. Update the `hymnFiles` array in `script.js`:
   ```javascript
   const hymnFiles = [
       { name: 'Hymn Name', audio: 'audio.ogg', image: 'image.jpg' },
       { name: 'New Hymn', audio: 'new-audio.ogg', image: null }
   ];
   ```

### Color Scheme
The color scheme can be customized by modifying the CSS variables in `index.html`:
- Primary: `#667eea` (Indigo)
- Secondary: `#764ba2` (Purple)
- Background gradients and glass effects

## Performance

- **Optimized Loading**: Lazy loading of PDFs and audio
- **Efficient Search**: Client-side filtering with highlighting
- **Smooth Animations**: CSS transitions for better UX
- **Mobile Optimized**: Touch-friendly interactions and responsive design

## Security

- **No Backend**: Fully static, no server-side processing
- **HTTPS Ready**: Works perfectly with GitHub Pages HTTPS
- **CORS Compliant**: All resources loaded from the same domain

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all file paths are correct
3. Verify that audio formats are supported by the browser
4. Test with different browsers if needed

## License

This project is open source and available under the MIT License.
