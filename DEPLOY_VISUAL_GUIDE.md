# 🎯 Deploy in 5 Minutes - Visual Guide

## Step 1️⃣: Prepare Your Code (30 seconds)

Open terminal in your project folder:

```bash
git init
git add .
git commit -m "My portfolio website"
```

---

## Step 2️⃣: Create GitHub Repository (1 minute)

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name**: `my-portfolio` (or any name)
   - **Visibility**: ✅ **Public** (required for free GitHub Pages)
   - Leave everything else unchecked
3. Click **"Create repository"**

---

## Step 3️⃣: Push to GitHub (30 seconds)

GitHub will show you commands. Copy and paste them:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual values!

---

## Step 4️⃣: Enable GitHub Pages (1 minute)

1. On your GitHub repository page, click **"Settings"** (top right)
2. Click **"Pages"** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"**
4. That's it! 🎉

---

## Step 5️⃣: Wait & Access (2-3 minutes)

1. Click **"Actions"** tab on your repository
2. Watch the deployment progress (green checkmark when done)
3. Your site is live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

---

## 🎊 Done!

Your website is now live and free forever!

### 📝 To Update Your Website:

```bash
# Make your changes, then:
git add .
git commit -m "Updated content"
git push
```

It will automatically rebuild and redeploy!

---

## 🆘 Troubleshooting

### "Actions" tab not showing?
- Make sure your repository is **public**
- Check that `.github/workflows/deploy.yml` file exists

### Blank page showing?
- Wait 3-5 minutes for first deployment
- Check the "Actions" tab for errors
- Make sure build completed successfully

### 404 error?
- Verify your URL format: `https://USERNAME.github.io/REPO-NAME/`
- Make sure repository name matches exactly

---

## 💡 Want a Custom Domain?

Example: `www.yourname.com` instead of `username.github.io`

1. Buy domain from Namecheap, GoDaddy, etc. (~$10/year)
2. Add `CNAME` file with your domain to `public` folder
3. Add custom domain in GitHub Settings → Pages
4. Configure DNS with your provider
5. Done!

---

## 🔄 Alternative: Even Easier Options

### Netlify (Drag & Drop!)

1. Build your site: `npm run build`
2. Go to: https://app.netlify.com/drop
3. Drag the `dist` folder to the page
4. Done! Instant URL like `your-site.netlify.app`

### Vercel (1-Click Deploy)

1. Go to: https://vercel.com/new
2. Sign in with GitHub
3. Click your repository
4. Click "Deploy"
5. Done! URL like `your-site.vercel.app`

---

## ❓ Need Help?

- GitHub Pages Docs: https://docs.github.com/pages
- Full Guide: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Issues? Check "Actions" tab for build errors
