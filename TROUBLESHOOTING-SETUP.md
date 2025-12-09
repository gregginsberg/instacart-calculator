# 🔧 Troubleshooting Guide

## ❌ "npm run dev isn't opening localhost"

This means the dev server hasn't started properly. Here's how to fix it:

---

## ✅ SOLUTION: Follow These Steps

### Step 1: Check Prerequisites

**Do you have Node.js installed?**

```bash
node --version
npm --version
```

Should show:
- Node: v18+ or v20+
- npm: v9+ or v10+

**Don't have Node?**
- Download from: https://nodejs.org/
- Install the LTS version
- Restart your terminal

---

### Step 2: Install Dependencies

```bash
# Navigate to the project folder
cd instacart-calculator

# Install all dependencies (takes 1-2 minutes)
npm install

# You should see output like:
# added 200 packages...
```

**If this fails:**

```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or clear cache first
npm cache clean --force
npm install
```

---

### Step 3: Start Dev Server

```bash
npm run dev
```

**You should see:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### Step 4: Open Browser

**Manually open:** http://localhost:5173

The calculator should load!

---

## 🐛 Common Issues

### Issue 1: "vite: command not found"

**Cause:** Dependencies not installed

**Fix:**
```bash
npm install
npm run dev
```

---

### Issue 2: "Port 5173 already in use"

**Cause:** Another app using that port

**Fix Option A - Use different port:**
```bash
npm run dev -- --port 3000
```

**Fix Option B - Kill existing process:**

**Mac/Linux:**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

**Windows:**
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID> /F
npm run dev
```

---

### Issue 3: "npm: command not found"

**Cause:** Node.js not installed

**Fix:**
1. Go to https://nodejs.org/
2. Download LTS version
3. Install
4. Restart terminal
5. Try again

---

### Issue 4: Page shows but is blank

**Cause:** JavaScript error

**Fix:**
1. Open browser console (F12)
2. Check for errors
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### Issue 5: "Cannot find module..."

**Cause:** Corrupted node_modules

**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### Issue 6: npm install is taking forever

**Normal:** First install takes 1-3 minutes

**If stuck > 5 minutes:**

```bash
# Cancel (Ctrl+C)
# Try with different registry
npm install --registry=https://registry.npmjs.org/

# Or use yarn instead
npm install -g yarn
yarn install
yarn dev
```

---

## 🚀 Alternative: Deploy to Netlify

Don't want to run locally? Deploy to the web for free:

### Quick Deploy (5 minutes)

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
cd instacart-calculator
npm install
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod
```

4. **Follow prompts:**
   - Create new site
   - Publish directory: `dist`
   - Get live URL!

**Your calculator is now online!** 🎉

---

## 📱 Quick Browser Preview

Don't want to set anything up? Download this file:

**[instacart-calculator-standalone.html](computer:///mnt/user-data/outputs/instacart-calculator-standalone.html)**

Open it in your browser for setup instructions.

---

## ✅ Verify Everything Works

Once `npm run dev` is running:

1. ✅ See "VITE ready" message
2. ✅ Local URL appears (http://localhost:5173)
3. ✅ Browser opens automatically OR you manually open the URL
4. ✅ Calculator loads with purple header
5. ✅ Can enter numbers in input fields
6. ✅ Results appear on the right side

---

## 🆘 Still Having Issues?

### Check This Checklist:

- [ ] Node.js version 18+ installed
- [ ] In correct folder (`cd instacart-calculator`)
- [ ] Ran `npm install` successfully
- [ ] No errors during install
- [ ] Firewall not blocking port 5173
- [ ] No antivirus blocking Node

### Get Your System Info:

```bash
node --version
npm --version
pwd
ls package.json
```

Share this output if you need more help!

---

## 🎯 Expected File Structure

After unzipping, you should have:

```
instacart-calculator/
├── package.json          ← Must exist
├── vite.config.ts        ← Must exist
├── index.html            ← Must exist
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── components/
│   └── utils/
└── node_modules/         ← Created by npm install
```

---

## 💡 Pro Tips

### Faster Startup
```bash
# After first install, dev server starts in ~1 second
npm run dev
```

### Clean Build
```bash
# If something feels broken
rm -rf node_modules dist .vite
npm install
npm run dev
```

### Production Build
```bash
# Create optimized build for deployment
npm run build

# Builds to /dist folder
# Deploy this folder to Netlify/Vercel
```

---

## 📞 Need More Help?

**Common Scenarios:**

1. **"I'm not technical"**  
   → Use Netlify drag-and-drop deploy (see DEPLOYMENT.md)

2. **"npm install fails"**  
   → Try `npm install --legacy-peer-deps`

3. **"I don't have Node"**  
   → Download from nodejs.org, install, restart terminal

4. **"Browser shows nothing"**  
   → Check browser console (F12) for errors

5. **"Want to skip setup"**  
   → Use pre-built version (coming soon) or deploy to Netlify

---

**Most issues are solved by:** `rm -rf node_modules && npm install` 🎯
