# 🚀 Vercel Deployment Guide for Planix App

## Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. **Go to GitHub.com**
   - Visit [https://github.com](https://github.com)
   - Sign in to your account (or create one)

2. **Create New Repository**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Repository name: `planix-app`
   - Make it **Public**
   - Don't initialize with README (we already have one)
   - Click "Create repository"

### Step 2: Upload Your Files to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. **In your new repository page:**
   - Click "uploading an existing file" link
   - Drag and drop ALL files from your planix-app folder:
     - `index.html`
     - `login.html`
     - `signup.html`
     - `app.js`
     - `auth.js`
     - `db.js`
     - `style.css`
     - `auth.css`
     - `vercel.json`
     - `package.json`
     - `README.md`
     - `deploy.md`
     - `.gitignore`

2. **Commit the files:**
   - Add a commit message: "Initial commit - Planix productivity app"
   - Click "Commit changes"

**Option B: Using Git Commands (If you have Git installed)**

```bash
# Open PowerShell in your planix-app folder
cd C:\Users\HP\OneDrive\Desktop\planix-app

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Planix productivity app"

# Set main branch
git branch -M main

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/planix-app.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to Vercel.com**
   - Visit [https://vercel.com](https://vercel.com)
   - Click "Sign Up" or "Continue with GitHub"

2. **Connect GitHub Account**
   - Authorize Vercel to access your GitHub account
   - This allows Vercel to see your repositories

3. **Import Your Project**
   - Click "New Project"
   - You should see your `planix-app` repository
   - Click "Import" next to it

4. **Configure Project**
   - **Project Name**: `planix-app` (or any name you want)
   - **Framework Preset**: Leave as "Other" (auto-detected)
   - **Root Directory**: Leave as `./` (current directory)
   - **Build Command**: Leave empty (not needed for static site)
   - **Output Directory**: Leave empty (not needed for static site)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 1-2 minutes)

### Step 4: Your App is Live! 🎉

- **Your app URL**: `https://planix-app.vercel.app` (or similar)
- **Custom domain**: You can add one later in Vercel settings

## Testing Your Deployed App

1. **Visit your Vercel URL**
2. **Test Signup:**
   - Click "Sign up"
   - Enter your details (name, Gmail, password)
   - Should redirect to dashboard
3. **Test Login:**
   - Logout and login again
   - Should work with same credentials
4. **Test Features:**
   - Add tasks with dates (they'll appear in day columns)
   - Use the timer
   - Set alarms
   - Save notes
5. **Share with others!**

## Vercel Dashboard Features

Once deployed, you can:

- **View Analytics**: See how many people visit your app
- **Add Custom Domain**: Use your own domain name
- **Environment Variables**: Add any configuration if needed
- **Automatic Deployments**: Every time you update GitHub, Vercel auto-deploys
- **Preview Deployments**: Test changes before going live

## Troubleshooting

**If deployment fails:**
1. Check that all files are uploaded to GitHub
2. Verify `vercel.json` is in your repository
3. Check Vercel deployment logs for errors

**If app doesn't work:**
1. Open browser console (F12)
2. Check for any JavaScript errors
3. Try clearing browser cache
4. Test in incognito mode

**If login doesn't work:**
1. Make sure all JS files are loading
2. Check localStorage is enabled
3. Try different browser

## Next Steps

1. **Customize your app** (optional):
   - Change colors in `style.css`
   - Add your own branding
   - Modify features in `app.js`

2. **Add custom domain** (optional):
   - Go to Vercel project settings
   - Add your domain name
   - Update DNS settings

3. **Share your app:**
   - Send the Vercel URL to friends and family
   - They can sign up and use all features!

## Your App Features

✅ **User Authentication**: Sign up/login with Gmail
✅ **Weekly Task Dashboard**: Organize tasks by day
✅ **Focus Timer**: Pomodoro technique
✅ **Alarm System**: Set reminders
✅ **Notes**: Save important information
✅ **Responsive Design**: Works on all devices
✅ **Modern UI**: Beautiful glassmorphism design

Your Planix app is now live and ready for the world! 🌍 