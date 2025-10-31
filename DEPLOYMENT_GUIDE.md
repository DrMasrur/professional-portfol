# Deployment Guide - GitHub Pages

This guide will help you deploy your portfolio website to GitHub Pages for free hosting.

- Your project f

### Option A: Create a Ne
1. Go to [GitHub](https://github
- Your project files ready to deploy

## Step 1: Prepare Your Repository

### Option A: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
git init
# Add all your files

git commit -m "Initial commit - Portfolio website"
# Add your GitHub repository

# Push to GitHub









git init

# Add all your files
git add .

# Commit your files
git commit -m "Initial commit - Portfolio website"

# Add your GitHub repository as remote
# Replace USERNAME and REPOSITORY with your actual GitHub username and repo name
git remote add origin https://github.com/USERNAME/REPOSITORY.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Configure Vite for GitHub Pages

The project is already configured for deployment. The `vite.config.ts` file includes the base path setting needed for GitHub Pages.

## Step 4: Build Your Site

Before deploying, build the production version:

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Step 5: Deploy to GitHub Pages

2. Connect your GitHub repository


1. Sign up at [vercel.com](h
3. Vercel 

1. Sign up at [pages.cloudflare.com](https://pages.cloudf
3. Build co
5. Dep

### Blank page after deployment
- Check browser console for errors

- This is a single-page app, ensure pro

- Verify asset imports use the `@/assets/` path
- Rebuild the project

To use your own domain:



- [Vite










































2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Vercel
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Vite settings
4. Deploy!

### Cloudflare Pages
1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy!

## Troubleshooting

### Blank page after deployment
- Make sure `base` in `vite.config.ts` matches your repository name
- Check browser console for errors
- Verify files are in the `dist` folder after build

### 404 errors on routes
- This is a single-page app, ensure proper routing configuration
- GitHub Pages serves `index.html` by default

### Assets not loading
- Verify asset imports use the `@/assets/` path
- Check that all assets are in the `src/assets/` directory
- Rebuild the project

## Custom Domain (Optional)

To use your own domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. In GitHub Settings → Pages, add your custom domain

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
