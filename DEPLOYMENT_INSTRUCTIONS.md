# 🚀 Deploy Phantom Assembly to GitHub Pages - Complete Guide

## ✅ What's Been Fixed

1. **Logo Image** ✓
   - Created custom SVG logo: `/public/images/logo.svg`
   - Updated constants.ts to use local image

2. **Founder Profile Image** ✓
   - Created professional SVG avatar: `/public/images/ranjith-profile.svg`
   - Replaced broken ibb.co link with local image

3. **Portfolio Project Images** ✓
   - Created 4 unique SVG images showcasing different tech stacks:
     - `project1.svg` - Serverless Architecture
     - `project2.svg` - Kubernetes Cluster
     - `project3.svg` - CI/CD Pipeline
     - `project4.svg` - Infrastructure as Code
   - Updated all portfolio projects to use local images

4. **GitHub Setup** ✓
   - Initialized Git repository
   - Set up GitHub Actions workflow for automatic deployment
   - Created comprehensive deployment guides

5. **Build Configuration** ✓
   - Updated vite.config.ts to support GitHub Pages base path
   - Production build verified and working
   - All images included in dist folder

## 📋 Step-by-Step Deployment Instructions

### Step 1: Create Your GitHub Repository

1. Go to https://github.com/new
2. Configure:
   - **Repository name**: `phantom-assembly` (or your choice)
   - **Description**: Cloud & Operations Engineering Portfolio
   - **Public**: Yes (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license
3. Click "Create repository"

### Step 2: Connect Your Local Repository

Run these commands in your terminal:

```bash
cd /home/rakzzz/Documents/phantom-assembly

# Add the GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/phantom-assembly.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push the initial commit
git push -u origin main
```

**Expected output:**
```
Enumerating objects: 35, done.
Counting objects: 100% (35/35), done.
...
To https://github.com/YOUR_USERNAME/phantom-assembly.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Step 3: Create the gh-pages Branch

```bash
# Create orphan gh-pages branch (disconnected from main)
git checkout --orphan gh-pages

# Clear all files from the branch
git reset --hard

# Create initial commit
git commit --allow-empty -m "Initial gh-pages commit"

# Push the new branch
git push origin gh-pages

# Return to main branch
git checkout main
```

### Step 4: Configure GitHub Pages in Repository Settings

1. Go to https://github.com/YOUR_USERNAME/phantom-assembly/settings
2. Navigate to the **"Pages"** section (in left sidebar)
3. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "gh-pages" from dropdown
   - **Folder**: Leave as "/ (root)"
4. Click "Save"

**Keep this page open** - you'll see your deployment URL here once it's ready!

### Step 5: Deploy to GitHub Pages

#### Option A: Manual Deployment (One-time)

```bash
# Build the production version
npm run build

# Force add the dist folder (it's normally gitignored)
git add dist -f

# Commit the build
git commit -m "Deploy to GitHub Pages"

# Push the dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

Wait 1-2 minutes, then check your GitHub Pages URL:
- **For project site**: https://YOUR_USERNAME.github.io/phantom-assembly
- **For user site**: https://YOUR_USERNAME.github.io (if repo is named YOUR_USERNAME.github.io)

#### Option B: Automatic Deployment (Recommended)

The repository already includes a GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. Simply push your code:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

2. Go to your repository's "Actions" tab to watch the deployment
3. The site will automatically build and deploy to GitHub Pages

## 🔧 Important Configuration for Your Setup

### If Using Project Repository (e.g., phantom-assembly)

The base path is already set to `/` in vite.config.ts, which works for:
- Project sites: `https://USERNAME.github.io/phantom-assembly`

### If Using User Repository (e.g., USERNAME.github.io)

Update vite.config.ts:
```typescript
base: '/', // Correct for user/org sites
```

## 🔐 API Key Setup (Optional)

The AI-powered features require a Google Gemini API key:

1. Go to https://aistudio.google.com
2. Click "Get API Key"
3. Create a new API key
4. Add to `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

**⚠️ Security Note**: For production GitHub Pages:
- API keys will be exposed in browser (client-side)
- For production, use a backend service to handle API calls
- See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for more details

## 📊 Verify Deployment

After pushing, verify:

1. **GitHub Pages is enabled**: 
   - Go to Settings → Pages
   - Should show "Your site is live at: https://..."

2. **Images are loading**:
   - Visit your site
   - Check that logo, profile, and portfolio images appear
   - Open DevTools (F12) → Network tab
   - Look for all `.svg` files loading with 200 status

3. **No build errors**:
   - Go to Actions tab
   - Click latest workflow run
   - Check "Deploy" step for any errors

## ✨ Features on Your Live Site

Once deployed, your visitors can:
- ✅ View your professional portfolio
- ✅ Browse your services
- ✅ See your work examples (portfolio projects)
- ✅ Read client testimonials
- ✅ Estimate cloud architecture costs (with API key)
- ✅ Contact you via the contact form
- ✅ Visit your social media profiles

## 🆘 Troubleshooting

### Site shows "404 Not Found"
- Wait 5 minutes for GitHub Pages to process
- Check Settings → Pages for deployment status
- Verify gh-pages branch exists in your repository

### Images not loading
- Check browser DevTools (F12) → Network tab
- Ensure `/images/` folder is in dist folder
- For user sites, verify `base: '/'` in vite.config.ts
- For project sites, verify base path matches repo name

### API features not working
- Check browser console for errors
- Verify `.env.local` has correct API key (local only)
- GitHub Actions needs `secrets.GEMINI_API_KEY` setup for CI/CD

### Git push fails
- Run `git status` to check current state
- Ensure you've created gh-pages branch: `git branch -a`
- Try: `git subtree pull --prefix dist origin gh-pages 2>/dev/null || true` first

## 📝 Making Updates

After your site is live, to update it:

```bash
# Make your changes to the code
# Edit files, update content, etc.

# Commit your changes
git add .
git commit -m "Update: Your changes here"

# Push to GitHub
git push origin main

# Automatic deployment via GitHub Actions
# OR manually:
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

## 🎉 Useful Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Documentation](https://react.dev)

## 📧 Next Steps

1. ✅ Fix images - DONE
2. ✅ Set up Git - DONE
3. 📌 Create GitHub repository - **YOU DO THIS**
4. 📌 Push to GitHub - **YOU DO THIS**
5. 📌 Configure GitHub Pages - **YOU DO THIS**
6. 🎉 Share your live portfolio!

---

**Your site is ready to deploy!** Follow the steps above to get your Phantom Assembly portfolio live on the internet. 🚀

For questions, refer to the [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) file for more detailed information.
