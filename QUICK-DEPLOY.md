# ⚡ Quick Deploy Guide (5 Minutes)

## 🎯 Fastest Way to Get Your Calculator Online

---

## OPTION 1: Super Quick (No GitHub) - 2 Minutes

### Step 1: Build
```bash
cd instacart-calculator
npm run build
```
(Creates `dist` folder)

### Step 2: Upload
1. Go to: **https://app.netlify.com/drop**
2. Drag the **`dist` folder** onto the page
3. Wait 30 seconds
4. **DONE!** You get a URL like: `random-name-123.netlify.app`

**Share that URL with anyone!**

---

## OPTION 2: Best Way (With GitHub) - 20 Minutes

### Step 1: Put Code on GitHub

```bash
# Create GitHub account at github.com (if needed)
# Create new repository: "instacart-calculator"

cd instacart-calculator
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/instacart-calculator.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. Go to: **https://app.netlify.com** (sign up with GitHub)
2. Click: **"Add new site"**
3. Click: **"Import from GitHub"**
4. Select: **"instacart-calculator"** repo
5. Settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click: **"Deploy"**

### Step 3: Wait 2 Minutes

Your site is live! URL: `your-site-name.netlify.app`

### Step 4: Change URL (Optional)

1. Site Settings → Site Information
2. Click "Change site name"
3. Enter: `my-instacart-calculator`
4. New URL: `my-instacart-calculator.netlify.app`

---

## ✨ BENEFITS

### Option 1 (Netlify Drop):
- ⚡ Fastest (2 minutes)
- 🆓 Free
- ❌ Manual updates (re-upload for changes)

### Option 2 (GitHub + Netlify):
- 🔄 Auto-updates (just push code)
- 🆓 Free forever
- 💎 Professional
- ✅ **Recommended!**

---

## 🔄 Future Updates (Option 2)

After setup, updating is easy:

```bash
# Make changes to code
git add .
git commit -m "Added new feature"
git push

# Netlify auto-deploys in 2 minutes!
```

---

## 🌐 Share Your Calculator

Once live, share the URL:

✅ Email to clients  
✅ Add to website  
✅ Post on LinkedIn  
✅ Include in presentations  
✅ QR codes  

Anyone with the link can use it!

---

## 💰 Cost

**$0 - Completely Free!**

Netlify free tier includes:
- ✅ Unlimited sites
- ✅ HTTPS
- ✅ CDN (fast worldwide)
- ✅ 100GB bandwidth/month
- ✅ Auto-deploy

More than enough for most use cases!

---

## 🎯 RECOMMENDED: DO THIS NOW

1. ⏰ **Spend 20 minutes**
2. 📦 **Use Option 2** (GitHub + Netlify)
3. 🚀 **Get it live**
4. 🎉 **Share with world!**

**Full walkthrough:** See [WEB-DEPLOYMENT-GUIDE.md](WEB-DEPLOYMENT-GUIDE.md)

---

## 🆘 Need Help?

**Stuck on GitHub setup?**
- Tutorial: https://guides.github.com/activities/hello-world/

**Stuck on Netlify?**
- Docs: https://docs.netlify.com/

**Can't push to GitHub?**
```bash
# Try this:
git pull origin main
git push
```

---

## 🎊 What You'll Have

After 20 minutes:

✅ Live calculator at: `your-name.netlify.app`  
✅ Anyone can access it  
✅ Works on any device  
✅ Auto-updates when you push code  
✅ Secure (HTTPS)  
✅ Fast (CDN)  
✅ Free forever  

**Your calculator is now a real web app!** 🌐✨
