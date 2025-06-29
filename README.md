# Planix - Productivity App

A beautiful productivity app with task management, timer, alarms, notes, and messaging features.

## Features

- ✅ **User Authentication**: Sign up and login with Gmail
- ✅ **Weekly Task Dashboard**: Organize tasks by day of the week
- ✅ **Focus Timer**: Pomodoro technique timer
- ✅ **Alarm System**: Set and manage alarms
- ✅ **Notes**: Save and manage notes
- ✅ **Quick Messages**: Connect with Instagram, WhatsApp, and Gmail
- ✅ **Modern UI**: Beautiful glassmorphism design
- ✅ **Responsive**: Works on all devices

## Deployment Instructions

### Option 1: Netlify (Recommended)

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Upload all your files to the repository

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Click "Deploy site"

3. **Your app will be live at**: `https://your-app-name.netlify.app`

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 3: GitHub Pages

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Save

2. **Your app will be live at**: `https://your-username.github.io/your-repo-name`

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/planix-app.git
   cd planix-app
   ```

2. **Start local server**
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser**
   - Go to `http://localhost:8000`

## File Structure

```
planix-app/
├── index.html          # Main app page
├── login.html          # Login page
├── signup.html         # Signup page
├── style.css           # Main app styles
├── auth.css            # Authentication styles
├── app.js              # Main app functionality
├── auth.js             # Authentication logic
├── db.js               # Database operations
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## How to Use

1. **Sign Up**: Create an account with your Gmail
2. **Add Tasks**: Use the weekly dashboard to organize tasks by day
3. **Set Timer**: Use the focus timer for productivity
4. **Set Alarms**: Create alarms for important reminders
5. **Take Notes**: Save important information
6. **Connect**: Link your social media accounts for quick messaging

## Technologies Used

- HTML5
- CSS3 (with modern features like backdrop-filter)
- Vanilla JavaScript
- LocalStorage for data persistence
- Font Awesome for icons

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License. 