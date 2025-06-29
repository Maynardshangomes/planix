# 🚀 Quick Deployment Guide

## Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it: `planix-app`
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Files to GitHub

**Option A: Using GitHub Web Interface**
1. In your new repository, click "uploading an existing file"
2. Drag and drop ALL files from your planix-app folder
3. Click "Commit changes"

**Option B: Using Git (if you have Git installed)**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/planix-app.git
git push -u origin main
```

### Step 3: Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com)
2. Click "Sign up" (use your GitHub account)
3. Click "New site from Git"
4. Choose "GitHub"
5. Select your `planix-app` repository
6. Click "Deploy site"

### Step 4: Your App is Live! 🎉

Your app will be available at: `https://your-app-name.netlify.app`

## Alternative: Vercel Deployment

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `planix-app` repository
5. Click "Deploy"

## Testing Your Deployed App

1. Visit your live URL
2. Click "Sign up" to create an account
3. Add some tasks with dates
4. Test all features (timer, alarms, notes)
5. Share the URL with others!

## Important Notes

- ✅ **Data Storage**: User data is stored in their browser's localStorage
- ✅ **No Backend**: This is a frontend-only app
- ✅ **Free Hosting**: Netlify and Vercel offer free hosting
- ✅ **Custom Domain**: You can add a custom domain later

## Troubleshooting

**If the app doesn't work:**
1. Check browser console for errors
2. Make sure all files are uploaded
3. Try clearing browser cache
4. Test in different browsers

**If login doesn't work:**
1. Check if auth.js is properly loaded
2. Verify localStorage is enabled
3. Try in incognito mode

## Sharing Your App

Once deployed, you can share your app URL with anyone! They can:
- Sign up with their Gmail
- Create their own account
- Use all features independently
- Their data stays private in their browser 