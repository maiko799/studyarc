# 📚 Study Tracker

A beautiful, modern web app to track your study sessions and unlock personalized performance insights. With a whimsical design and smart analytics, this app helps you understand your study patterns and optimize your learning.

## ✨ Features

### 📝 Comprehensive Study Logging
Track detailed information about every study session:
- **Time Variables**: Time of day, day type, and session duration
- **Personal Performance**: Energy level, focus/concentration, mood, sleep quantity & quality
- **Task Details**: Subject/topic, difficulty level, study type (Reading, Problem-Solving, Reviewing Notes, Practice Tests, Coding)
- **Outcomes**: Retention score, progress notes, efficiency rating

### 📊 Data & Analytics
Three powerful tabs for analyzing your study data:
1. **Data Tab**: View all your study entries with expandable cards showing detailed information
2. **Statistics Tab**: See key metrics like average energy, focus, retention, total study hours, mood, and efficiency
3. **Performance Analysis Tab**: Get personalized insights about your peak study times, best performance sessions, areas for improvement, and sleep-performance connections

### 🎨 Modern Design
- **Cute Aesthetics**: Gradient backgrounds, custom fonts (Quicksand & Comfortaa), smooth animations
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing anytime
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Glassmorphism Effects**: Modern UI with frosted glass backgrounds

### 🌟 Smart Features
- **Inspirational Success Page**: After submitting data, see dynamically generated unique quotes with motivational messages
- **Data Persistence**: All your study data is saved locally in your browser using localStorage
- **Delete Data**: Clear all your data and start fresh whenever you want
- **Theme Toggle**: Switch between light and dark modes with one click

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### How to Use
1. Open `index.html` in your web browser
2. Fill out the study form with your session details
3. Click "Save Entry"
4. See your inspirational success message with a randomly generated quote
5. Add more data or view your analytics on the "Data & More" page

### File Structure
```
├── index.html              # Main form for logging study sessions
├── success.html            # Success page with quotes and navigation
├── past-entries.html       # Data analytics dashboard (Data & More)
├── script.js               # Form submission and data handling
├── success-script.js       # Quote generation and theme toggle
├── entries-script.js       # Analytics and statistics generation
├── styles.css              # All styling (1000+ lines of modern CSS)
└── README.md              # This file
```

## 💾 Data Storage

Your study data is stored **locally in your browser** using localStorage. This means:
- ✅ Your data stays private and secure on your device
- ✅ No account creation needed
- ✅ Data persists across browser sessions
- ⚠️ Data is lost if you clear browser history/cache
- ⚠️ Data doesn't sync across different browsers or devices

## 🎨 Color Palette

The app uses a carefully selected color scheme:
- **Primary Red**: #ff6b6b (Save button, delete button)
- **Teal**: #4ecdc4 (Secondary actions, accents)
- **Dark Blue**: #2c3e50 (Text, dark mode background)
- **Light Blue**: #45b7d1 (Links, hover states)

## 📱 Responsive Breakpoints

The design is optimized for:
- **Desktop**: Full experience with all features
- **Tablet**: Adjusted spacing and button sizes
- **Mobile**: Stacked layout, touch-friendly buttons

## 🔧 Customization

### Change the Color Scheme
Edit the color variables in `styles.css` at the top of the file.

### Add More Study Types
Edit the `<select id="studyType">` in `index.html` to add new study categories.

### Modify Analytics Metrics
Update the statistics calculations in the `loadStatistics()` function in `entries-script.js`.

### Add Custom Quotes
Modify the quote arrays in `success-script.js` to customize the inspirational messages.

## 📚 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage API
- **Fonts**: Google Fonts (Quicksand, Comfortaa)
- **Icons**: Custom SVG graphics

## 🎯 Study Types Supported

- 📖 **Reading**: Traditional reading and note-taking
- 🧮 **Problem-Solving**: Working through practice problems
- 📝 **Reviewing Notes**: Studying and reviewing notes
- 📋 **Practice Tests**: Taking practice exams and quizzes
- 💻 **Coding**: Programming and code practice

## 💡 Tips for Best Results

1. **Be Consistent**: The more data you log, the more accurate your performance analysis becomes
2. **Fill Honestly**: Accurate personal metrics (energy, focus, mood, sleep) give better insights
3. **Log Details**: Include specific progress notes for better retrospective analysis
4. **Regular Check-ins**: View your analytics weekly to identify patterns and optimize your study routine

## 🗑️ Delete All Data

To clear all your data and start fresh:
1. Go to the "Data & More" page
2. Click the "Delete All Data" button
3. Confirm the action

## ✨ Features Coming Soon

- 📈 Trend analysis and charts
- 🎯 Study goals and progress tracking
- 🔔 Study session reminders
- 📲 Data export to CSV
- 📊 Comparison across different subjects and study types

## 📄 License

Free to use and customize for personal study tracking.

## 🎉 Credits

Built with ❤️ for studious learners everywhere. Designed to make studying not just productive, but also whimsical and fun!

---

**Study smart, stay whimsical!** ✨
