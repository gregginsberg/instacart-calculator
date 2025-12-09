# 🔧 Setup & Troubleshooting Guide

## ❌ "Nothing happens when I run npm run dev"

This means the dependencies aren't installed yet. Here's the fix:

---

## ✅ COMPLETE SETUP STEPS

### Step 1: Extract the ZIP
```bash
unzip instacart-calculator-phase2.zip
cd instacart-calculator
```

### Step 2: Install Dependencies (REQUIRED!)
```bash
npm install
```

**This step is crucial!** It downloads all required packages (~200MB).

**Expected output:**
```
added 123 packages in 15s
```

### Step 3: Run the Development Server
```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser
Open the URL shown (usually `http://localhost:5173/`)

---

## 🚨 COMMON ISSUES

### Issue 1: "vite: not found"
**Cause:** Dependencies not installed  
**Fix:** Run `npm install` first

### Issue 2: "npm: command not found"
**Cause:** Node.js not installed  
**Fix:** Install Node.js from https://nodejs.org/ (download LTS version)

### Issue 3: Port 5173 already in use
**Cause:** Another app using that port  
**Fix:** Vite will automatically use 5174, 5175, etc.

### Issue 4: Nothing opens automatically
**Cause:** Browser doesn't auto-open  
**Fix:** Manually copy the URL (e.g., http://localhost:5173/) and paste in browser

### Issue 5: "Cannot find module"
**Cause:** Corrupted install  
**Fix:** 
```bash
rm -rf node_modules
npm install
```

---

## 🎯 QUICK START (Copy-Paste)

**For macOS/Linux:**
```bash
# Extract and setup
unzip instacart-calculator-phase2.zip
cd instacart-calculator

# Install dependencies (takes ~30 seconds)
npm install

# Start server
npm run dev

# Open browser to: http://localhost:5173/
```

**For Windows (PowerShell):**
```powershell
# Extract ZIP using File Explorer first, then:
cd instacart-calculator

# Install dependencies
npm install

# Start server
npm run dev

# Open browser to: http://localhost:5173/
```

---

## ✅ VERIFICATION

After `npm run dev`, you should see:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Then:
1. **Copy the Local URL** (http://localhost:5173/)
2. **Paste in browser**
3. **You should see the calculator!**

---

## 📋 PREREQUISITES

Make sure you have installed:

1. **Node.js** (v16 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **npm** (comes with Node.js)
   - Check: `npm --version`
   - Should be v8 or higher

If either command fails, install Node.js first!

---

## 🌐 ALTERNATIVE: DEPLOY ONLINE

If local setup is too complex, deploy to Netlify (free):

### Option A: Netlify Drop
1. Build the project:
   ```bash
   npm install
   npm run build
   ```
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder to Netlify
4. Get instant URL!

### Option B: Deploy from GitHub
1. Push code to GitHub
2. Connect to Netlify
3. Auto-deploy on every push

See **DEPLOYMENT.md** for full guide.

---

## 💡 DEVELOPMENT WORKFLOW

Once running:

1. **Edit code** in `src/` folder
2. **Save file** (Ctrl+S / Cmd+S)
3. **Browser auto-refreshes** (hot reload)
4. See changes instantly!

**No need to restart server** - Vite handles it!

---

## 🛑 STOPPING THE SERVER

Press `Ctrl+C` in the terminal where `npm run dev` is running.

---

## 🔍 DEBUGGING

### Check Node/npm versions:
```bash
node --version  # Should be v16+
npm --version   # Should be v8+
```

### View detailed logs:
```bash
npm run dev -- --debug
```

### Clear cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 WHAT GETS INSTALLED

When you run `npm install`, it downloads:

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (super fast!)
- **~120 other packages** - Dependencies

Total size: ~200MB in `node_modules/` folder

**Don't worry** - this is normal for modern web apps!

---

## ✨ FIRST TIME USING NODE.JS?

**Welcome!** Here's what's happening:

1. **npm** = Package manager (like App Store for code)
2. **package.json** = List of what to install
3. **node_modules/** = Where packages are saved
4. **npm install** = Downloads everything needed
5. **npm run dev** = Starts the app

**That's it!** Once you understand this, you're ready.

---

## 🎓 LEARNING PATH

If you want to customize the calculator:

1. **Start with:** `src/App.tsx` (main logic)
2. **Then explore:** `src/components/` (individual features)
3. **Styling in:** `src/App.css`
4. **Calculations in:** `src/utils/calculations.ts`

All files are commented and easy to read!

---

## 🆘 STILL STUCK?

**Checklist:**
- [ ] Node.js installed? (`node --version`)
- [ ] In correct folder? (`cd instacart-calculator`)
- [ ] Dependencies installed? (`npm install`)
- [ ] Server running? (`npm run dev`)
- [ ] URL opened in browser? (http://localhost:5173/)

If all checked and still issues, try:
1. Restart terminal
2. `rm -rf node_modules && npm install`
3. `npm run dev`

---

## 🚀 SUCCESS LOOKS LIKE:

When everything works:
1. Terminal shows "ready in XXX ms"
2. URL is displayed (http://localhost:5173/)
3. Opening URL shows the calculator
4. You can enter data and see results!

**Now you're ready to use the calculator!** 🎉

---

## 📞 QUICK REFERENCE

```bash
# One-time setup
npm install              # Install dependencies (required!)

# Every time you want to use it
npm run dev             # Start development server

# When done
Ctrl+C                  # Stop server

# For production
npm run build           # Creates optimized version
```

---

**The key thing to remember:** Always run `npm install` first! 🔑
