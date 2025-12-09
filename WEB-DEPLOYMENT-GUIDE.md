# 🌐 Deploy Your Calculator to the Web

## 🎯 Goal
Turn your calculator into a live website that anyone can access at a URL like:
- `your-calculator.netlify.app`
- `calculator.yourdomain.com`
- `instacart-calc.vercel.app`

---

## ⚡ OPTION 1: Netlify Drop (EASIEST - 2 Minutes)

**Best for:** Quick sharing, no technical setup needed

### Step 1: Build Your Project
```bash
cd instacart-calculator
npm install
npm run build
```

This creates a `dist` folder with your website files.

### Step 2: Drag & Drop to Netlify
1. Go to https://app.netlify.com/drop
2. **Drag the entire `dist` folder** onto the page
3. Wait 30 seconds while it uploads
4. **You get a live URL!** (e.g., `random-name-123.netlify.app`)

### Step 3: Share Your Link
That's it! Send the URL to anyone.

**Pros:**
- ✅ Free forever
- ✅ Instant deployment (2 minutes)
- ✅ HTTPS included
- ✅ No account needed (but recommended)

**Cons:**
- ❌ Random URL (can change in account)
- ❌ Manual updates (re-drag for changes)

---

## 🚀 OPTION 2: Netlify with GitHub (RECOMMENDED)

**Best for:** Professional deployment with auto-updates

### Prerequisites:
- GitHub account (free at github.com)
- Your code in a GitHub repository

### Step 1: Create GitHub Repository

**If you don't have code on GitHub yet:**

1. Create account at github.com
2. Click "New Repository"
3. Name: `instacart-calculator`
4. Make it Public or Private
5. Click "Create"

**Upload your code:**
```bash
cd instacart-calculator
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/instacart-calculator.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. Go to https://app.netlify.com (sign up free)
2. Click **"Add new site" → "Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify
5. Select your `instacart-calculator` repository
6. Build settings (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click **"Deploy site"**

### Step 3: Get Your URL

Wait 2-3 minutes. You'll get a URL like:
`https://amazing-site-name-123.netlify.app`

**Change the name:**
1. Go to Site Settings
2. Click "Change site name"
3. Enter: `my-instacart-calculator`
4. New URL: `https://my-instacart-calculator.netlify.app`

### Step 4: Auto-Deploy Updates

**Now any code changes automatically deploy:**
```bash
# Make changes to your code
git add .
git commit -m "Added new feature"
git push
```

Netlify automatically:
- Detects your push
- Builds your site
- Deploys updates
- Live in ~2 minutes!

**Pros:**
- ✅ Free forever
- ✅ Custom subdomain
- ✅ Auto-deploy on push
- ✅ HTTPS included
- ✅ CDN (fast worldwide)
- ✅ Easy rollbacks

**Cons:**
- ❌ Requires GitHub setup (one-time)

---

## 💎 OPTION 3: Custom Domain (PROFESSIONAL)

**Best for:** Branded URLs like `calculator.yourcompany.com`

### Prerequisites:
- Domain name (from GoDaddy, Namecheap, etc.)
- Netlify site deployed (from Option 2)

### Step 1: Configure Netlify

1. In Netlify, go to your site
2. Click **"Domain settings"**
3. Click **"Add custom domain"**
4. Enter: `calculator.yourcompany.com`
5. Click "Verify"

### Step 2: Update DNS Records

**At your domain registrar (GoDaddy, Namecheap, etc.):**

1. Log into your domain dashboard
2. Find "DNS Settings" or "Manage DNS"
3. Add new record:
   - Type: `CNAME`
   - Name: `calculator`
   - Value: `your-site.netlify.app`
   - TTL: `3600`
4. Save

### Step 3: Wait for DNS

- Takes 5 minutes to 24 hours
- Usually works in ~1 hour
- Netlify auto-configures HTTPS

**Your site is now at:**
`https://calculator.yourcompany.com`

---

## 🔥 OPTION 4: Vercel (Alternative to Netlify)

**Best for:** Similar to Netlify, slightly different features

### Quick Deploy:

1. Go to https://vercel.com
2. Sign up free (use GitHub)
3. Click **"Add New Project"**
4. Import your GitHub repo
5. Framework Preset: **Vite**
6. Click **"Deploy"**

Done! You get a URL like:
`https://instacart-calculator.vercel.app`

**Similar features to Netlify:**
- Free tier
- Auto-deploy
- Custom domains
- HTTPS included

---

## 🏠 OPTION 5: Your Own Server (ADVANCED)

**Best for:** Full control, own infrastructure

### Prerequisites:
- VPS (DigitalOcean, AWS, Linode)
- Domain name
- Basic Linux knowledge

### Quick Setup (Ubuntu):

```bash
# On your server
sudo apt update
sudo apt install nodejs npm nginx

# Upload your code
git clone https://github.com/your-username/instacart-calculator.git
cd instacart-calculator
npm install
npm run build

# Configure Nginx
sudo nano /etc/nginx/sites-available/calculator
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name calculator.yourdomain.com;
    root /path/to/instacart-calculator/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/calculator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup HTTPS with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d calculator.yourdomain.com
```

**Pros:**
- ✅ Full control
- ✅ No vendor lock-in
- ✅ Can customize server

**Cons:**
- ❌ Complex setup
- ❌ You manage security
- ❌ Costs ~$5-10/month

---

## 🎯 RECOMMENDED APPROACH

### For Most People:
**Use Option 2: Netlify + GitHub**

**Why:**
- Free forever
- Professional URLs
- Auto-updates
- Zero maintenance
- Easy to use
- Trusted platform

### Setup Time:
- **First time:** 20 minutes (includes GitHub setup)
- **After that:** Push code → Auto-deploy (2 min)

---

## 📋 COMPLETE WALKTHROUGH (OPTION 2)

### Part 1: GitHub (One-Time Setup)

```bash
# 1. Create GitHub account at github.com (if needed)
# 2. Create new repository named "instacart-calculator"

# 3. In your local project folder:
cd instacart-calculator

# 4. Initialize git (if not already)
git init

# 5. Add all files
git add .

# 6. Commit
git commit -m "Initial commit - Instacart Calculator"

# 7. Connect to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/instacart-calculator.git

# 8. Push code
git branch -M main
git push -u origin main
```

### Part 2: Netlify Deployment

**Step-by-step with screenshots:**

1. **Go to Netlify**
   - Visit https://app.netlify.com
   - Click "Sign up" (use GitHub - easiest)
   - Authorize Netlify to access GitHub

2. **Create New Site**
   - Click "Add new site" button (top right)
   - Select "Import an existing project"
   - Click "Deploy with GitHub"

3. **Select Repository**
   - You'll see your repositories
   - Click "instacart-calculator"

4. **Configure Build**
   - Site name: Leave default or change
   - Branch: main
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

5. **Wait for Build**
   - Watch the build log
   - Takes 2-3 minutes first time
   - Shows "Site is live" when done

6. **Get Your URL**
   - You'll see: `https://random-name-123.netlify.app`
   - Click to visit your live site!

### Part 3: Customize URL (Optional)

1. In Netlify dashboard, click your site
2. Go to "Site configuration" → "Site information"
3. Click "Change site name"
4. Enter: `my-instacart-calc` (or any available name)
5. Save
6. New URL: `https://my-instacart-calc.netlify.app`

---

## 🔄 UPDATING YOUR SITE

After initial deployment, updates are easy:

```bash
# 1. Make changes to your code
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Added CSV import feature"

# 4. Push to GitHub
git push

# 5. Netlify auto-deploys!
# Check Netlify dashboard to watch deployment
# Site updates in ~2 minutes
```

---

## 💰 COST COMPARISON

| Option | Cost | Best For |
|--------|------|----------|
| Netlify Drop | Free | Quick tests |
| Netlify + GitHub | Free | Most users ⭐ |
| Vercel | Free | Alternative |
| Custom Domain | $10-15/year | Branding |
| Own Server | $5-60/month | Full control |

**Recommendation:** Start with free Netlify, add custom domain later if needed.

---

## 🎓 TROUBLESHOOTING

### "Build failed on Netlify"
**Solution:** Check build log. Common fixes:
```bash
# Locally test the build first
npm run build

# If that fails, check:
- Node version (needs 16+)
- Missing dependencies
- TypeScript errors
```

### "Page shows 404"
**Solution:** 
- Publish directory should be `dist` (not `build`)
- Check Netlify build log to confirm

### "Site not updating"
**Solution:**
- Check Netlify "Deploys" tab
- See if auto-deploy is enabled
- Try manual trigger: "Trigger deploy" button

### "GitHub push rejected"
**Solution:**
```bash
# First pull any changes
git pull origin main

# Then push
git push
```

---

## 🚀 GOING LIVE CHECKLIST

Before sharing your URL:

- [ ] Test on mobile (responsive design)
- [ ] Test CSV upload with real file
- [ ] Test all features work
- [ ] Add custom site name (remove random numbers)
- [ ] Check loading speed (should be fast)
- [ ] Verify HTTPS is working (padlock icon)
- [ ] Test in multiple browsers
- [ ] Share URL with test user

---

## 🎯 WHAT YOUR USERS SEE

When someone visits your URL:

1. **They see your calculator** (no download needed)
2. **It works in any browser** (Chrome, Safari, Firefox)
3. **On any device** (desktop, tablet, phone)
4. **Fast loading** (CDN-powered)
5. **Secure** (HTTPS)
6. **Always the latest version** (you control updates)

**Example URLs you could use:**
- `instacart-roi-calculator.netlify.app`
- `brand-profitability-tool.netlify.app`
- `upc-analyzer.netlify.app`
- `calculator.youragency.com`

---

## 💡 PRO TIPS

### Tip 1: Environment-Based Features
Keep dev and production separate:
- Development: `localhost:5173`
- Production: Your Netlify URL

### Tip 2: Analytics
Add Google Analytics to track usage:
1. Get tracking ID from analytics.google.com
2. Add to `index.html`
3. See how many people use your calculator!

### Tip 3: Share Links
Create shareable links:
- QR codes pointing to your URL
- Email signatures
- LinkedIn posts
- Client presentations

### Tip 4: Backup
GitHub = automatic backup:
- Your code is safe
- Version history maintained
- Can rollback anytime

### Tip 5: Collaboration
Invite team members:
- Netlify: Share site access
- GitHub: Add collaborators
- Multiple people can update

---

## 🎊 FINAL RECOMMENDATION

**Start Here:**

1. ⭐ **Use Netlify + GitHub (Option 2)**
2. Takes 20 minutes first time
3. Free forever
4. Professional result
5. Easy updates

**Later, if needed:**

6. Add custom domain ($10-15/year)
7. Add analytics
8. Scale as needed

**Your calculator will be live at a real URL anyone can access!** 🌐

---

## 📞 NEED HELP?

If you get stuck:

1. **Check Netlify docs:** docs.netlify.com
2. **GitHub guides:** docs.github.com
3. **Netlify support:** support.netlify.com
4. **Community:** netlify.community

Most common issues have quick solutions in Netlify docs!

---

**Ready to deploy? Start with Option 2 - you'll be live in 20 minutes!** 🚀
