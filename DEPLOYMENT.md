# Deployment Guide

## Building for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Output location:**
   - All production files will be in the `dist/` folder
   - This folder contains optimized, minified code ready for deployment

3. **Test the production build locally:**
   ```bash
   npm run preview
   ```

---

## Deployment Options

### Option 1: Netlify (Recommended - Easiest)

1. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

2. **Via Netlify UI:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/` folder
   - Done! Your site is live

3. **Build settings (if connecting Git):**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 2: Vercel

1. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Via Vercel UI:**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel auto-detects Vite settings
   - Deploy!

3. **Build settings:**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/instacart-calculator/', // Your repo name
   })
   ```

3. **Add deploy script to package.json:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: AWS S3 + CloudFront

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Create S3 bucket:**
   - Enable static website hosting
   - Set index document to `index.html`

3. **Upload dist/ contents to S3:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **(Optional) Add CloudFront for CDN:**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain

### Option 5: Traditional Web Server

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Upload dist/ contents to your server:**
   - Via FTP, SFTP, or your hosting control panel
   - Place in public_html or www directory

3. **Configure server for SPA:**
   
   **For Apache (.htaccess):**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **For Nginx:**
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

---

## Custom Domain Setup

### After deploying to Netlify or Vercel:

1. **Add custom domain in platform dashboard**
2. **Update DNS records:**
   - Add CNAME record pointing to platform
   - Or use A record for apex domain

3. **Enable HTTPS:**
   - Both platforms provide free SSL certificates
   - Auto-enabled for custom domains

---

## Environment Variables (If Needed Later)

Currently the app doesn't need environment variables, but if you add API integrations:

1. **Create `.env` file:**
   ```
   VITE_API_KEY=your-key-here
   VITE_API_URL=https://api.example.com
   ```

2. **Access in code:**
   ```typescript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

3. **Set in deployment platform:**
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment variables

---

## Performance Optimization

The app is already optimized, but for additional improvements:

1. **Enable compression** on your server
2. **Set cache headers** for static assets
3. **Use CDN** for global distribution (CloudFront, Cloudflare)
4. **Monitor with Lighthouse** for performance scores

---

## Monitoring & Analytics

### Add Google Analytics (Optional):

1. **Install package:**
   ```bash
   npm install react-ga4
   ```

2. **Initialize in main.tsx:**
   ```typescript
   import ReactGA from 'react-ga4';
   ReactGA.initialize('G-XXXXXXXXXX');
   ```

### Add error tracking (Optional):

Consider Sentry for production error monitoring:
```bash
npm install @sentry/react
```

---

## SSL Certificate

- **Netlify/Vercel**: Automatic, free SSL
- **Custom server**: Use Let's Encrypt (free)
- **CloudFront**: AWS Certificate Manager (free)

---

## Rollback Strategy

If you need to rollback a deployment:

- **Netlify**: Deploy → Deploys → Choose previous deploy → Publish
- **Vercel**: Deployments → Choose previous → Promote to production
- **Git-based**: Revert commit and redeploy

---

## Cost Estimates

- **Netlify Free Tier**: Free for personal projects, 100GB bandwidth
- **Vercel Free Tier**: Free for hobby projects, unlimited bandwidth
- **GitHub Pages**: Free for public repos
- **AWS S3 + CloudFront**: ~$1-5/month for low traffic
- **Traditional hosting**: $5-20/month depending on provider

---

## Maintenance

This is a static site with no backend, so maintenance is minimal:

- No database to backup
- No server to patch
- No dependencies to update regularly (optional to update React/Vite)

---

## Security Considerations

- No API keys exposed (all calculations happen client-side)
- No user data stored or transmitted
- No authentication required
- HTTPS recommended but not critical (no sensitive data)

---

## Support & Updates

To update the deployed app:

1. Make changes locally
2. Test with `npm run dev`
3. Build with `npm run build`
4. Deploy using your chosen method above

The deployment process is simple because this is a static site!
