# Vercel Deployment Guide

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Vite configuration

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `my-project` (if your project is in a subfolder)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd my-project
   vercel
   ```

4. **For Production Deployment**
   ```bash
   vercel --prod
   ```

## Configuration Files

### vercel.json
- Configured for Vite + React Router
- All routes redirect to `index.html` for SPA routing
- Asset caching headers for better performance

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: Auto-detected (recommended: 18.x or higher)

## Environment Variables

If you need environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18.x or higher)
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Routes Not Working
- Ensure `vercel.json` has the rewrite rule for SPA routing
- Check that React Router is configured correctly

### Assets Not Loading
- Verify asset paths are relative
- Check that assets are in `public` folder or imported correctly

## Notes
- Vercel automatically handles:
  - HTTPS/SSL certificates
  - CDN distribution
  - Automatic deployments on git push
  - Preview deployments for pull requests

