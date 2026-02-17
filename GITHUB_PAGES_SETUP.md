# GitHub Pages Deployment Guide for Phantom Assembly

## Quick Start

This guide will help you deploy Phantom Assembly to GitHub Pages.

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com/new)
2. Create a new repository named `phantom-assembly` (or any name you prefer)
3. Do NOT initialize with README, .gitignore, or license
4. Click "Create repository"

### Step 2: Connect Your Local Repository to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
cd /home/rakzzz/Documents/phantom-assembly
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Setup GitHub Pages

For a **user/organization site** (deploy as `USERNAME.github.io`):
- Repository name must be `USERNAME.github.io`
- Set the base path in vite.config.ts to `/`
- The site will be deployed to `https://USERNAME.github.io`

For a **project site** (deploy as `USERNAME.github.io/REPO_NAME`):
- Repository can be any name (e.g., `phantom-assembly`)
- Update base path: `export BASE_PATH=/REPO_NAME/`
- The site will be deployed to `https://USERNAME.github.io/REPO_NAME`

### Step 4: Setup Deployment Branch

1. Push your code to main:
```bash
git add .
git commit -m "Initial commit - Phantom Assembly website"
git push origin main
```

2. Create an orphan branch for GitHub Pages:
```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initial gh-pages commit"
git push origin gh-pages
```

3. Go back to main:
```bash
git checkout main
```

### Step 5: Build and Deploy

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Step 6: Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "gh-pages"
   - Folder: Select "/ (root)"
4. Click "Save"

Your site should be live in a few moments at:
- For user/org site: `https://USERNAME.github.io`
- For project site: `https://USERNAME.github.io/REPO_NAME`

## Automated Deployment (Optional - Using GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

After committing this file, automatic deployments will happen on every push to main.

## Important Notes

- **Founder Image URL**: Currently using `/images/ranjith-profile.svg`
- **Logo URL**: Currently using `/images/logo.svg`
- **Portfolio Images**: Using local SVG files in `/public/images/`
- All images are now served locally from the public folder

## Troubleshooting

### Site not showing up after push?
- Wait 1-2 minutes for GitHub to process the deployment
- Check "Settings" → "Pages" to see deployment status

### Images not loading?
- Ensure the `base` path in vite.config.ts matches your deployment URL
- For project sites, set `base: '/REPO_NAME/'`
- For user/org sites, set `base: '/'`

### API Key Issues?
- Create a `.env.local` file with: `VITE_GEMINI_API_KEY=your_key_here`
- GitHub Pages is a static site - you cannot expose API keys on client side
- Consider using a backend service for API calls in production

## Environment Variables

For the Gemini AI features to work on GitHub Pages, you have two options:

1. **Client-side (Current - Limited)**:
   - Create `.env.local`: `VITE_GEMINI_API_KEY=your_key`
   - This exposes your API key in the browser (not recommended for production)

2. **Backend-side (Recommended)**:
   - Create a backend service to handle API calls
   - Your GitHub Pages site calls the backend instead
   - This keeps your API key secure

## Next Steps

1. Update repository URL in this file with your actual GitHub username
2. Create the GitHub repository
3. Follow the steps above
4. Test your deployment
5. Share your live site link!

For more information, visit [GitHub Pages Documentation](https://docs.github.com/en/pages)
