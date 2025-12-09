# 🎯 THE PROBLEM YOU'RE HAVING

When you run `npm run dev` without installing dependencies first, you get:

```
vite: not found
```

This is because the app needs to download ~200MB of libraries first!

---

# ✅ THE SOLUTION (Copy-Paste This)

Open your terminal and run these commands **in order**:

```bash
# 1. Go to the folder
cd instacart-calculator

# 2. Install everything (REQUIRED!)
npm install

# 3. Start the app
npm run dev
```

That's it! Now open http://localhost:5173/ in your browser.

---

# 📝 DETAILED WALKTHROUGH

## Step 1: Extract the ZIP
- **Windows:** Right-click → Extract All
- **Mac:** Double-click the ZIP file
- **Linux:** `unzip instacart-calculator-phase2.zip`

## Step 2: Open Terminal
- **Windows:** Win+R → type `cmd` → Enter
- **Mac:** Cmd+Space → type `terminal` → Enter  
- **Linux:** Ctrl+Alt+T

## Step 3: Navigate to Folder
```bash
cd path/to/instacart-calculator
```

Replace `path/to/` with where you extracted it.

**Example:**
```bash
cd ~/Downloads/instacart-calculator          # Mac/Linux
cd C:\Users\YourName\Downloads\instacart-calculator  # Windows
```

## Step 4: Install Dependencies
```bash
npm install
```

**What this does:**
- Downloads React, TypeScript, Vite, and 120+ other packages
- Takes ~30 seconds
- Creates `node_modules/` folder (~200MB)
- Only needs to be done ONCE

**You'll see:**
```
npm WARN deprecated ...
added 123 packages in 15.2s
```

This is normal!

## Step 5: Start the Development Server
```bash
npm run dev
```

**You'll see:**
```
VITE v5.0.0  ready in 482 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 6: Open in Browser
1. Copy the URL: `http://localhost:5173/`
2. Paste in Chrome, Firefox, Safari, etc.
3. You should see the calculator!

---

# 🎉 SUCCESS!

If you see the calculator interface, you're done! Now you can:

✅ Enter campaign data  
✅ Add products to portfolio  
✅ Compare multiple SKUs  
✅ Analyze performance  

---

# ❌ COMMON ERRORS & FIXES

## Error: "npm: command not found"

**Cause:** Node.js not installed

**Fix:** 
1. Go to https://nodejs.org/
2. Download the LTS version
3. Install it
4. Restart terminal
5. Try again

## Error: "vite: not found"

**Cause:** You skipped `npm install`

**Fix:** Run `npm install` first!

## Error: "Cannot find module"

**Cause:** Corrupted installation

**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Error: "Port 5173 already in use"

**Cause:** Another app using that port

**Fix:** Vite will automatically try 5174, 5175, etc. Use the URL it shows.

---

# 🔄 EVERYDAY USE

After the first time setup, you only need:

```bash
npm run dev
```

**To stop the server:**
Press `Ctrl+C` in the terminal

---

# 💡 WHY THIS IS NECESSARY

Modern web apps don't include dependencies in the ZIP because:
- Would make ZIP 200MB+ instead of 100KB
- Dependencies can be downloaded fresh from npm
- Ensures you get the latest security patches
- Standard practice for all Node.js projects

**Think of it like:**
- ZIP = the recipe
- `npm install` = buying the ingredients
- `npm run dev` = cooking the meal

---

# 📞 STILL STUCK?

**Check these:**
1. [ ] Node.js installed? Run: `node --version`
2. [ ] In correct folder? Run: `ls` (should see package.json)
3. [ ] Dependencies installed? Run: `npm install`
4. [ ] Server started? Run: `npm run dev`
5. [ ] URL opened? Copy http://localhost:5173/ to browser

If all yes and still broken:
1. Close terminal
2. Open new terminal
3. `cd instacart-calculator`
4. `rm -rf node_modules`
5. `npm install`
6. `npm run dev`

---

**The key takeaway: ALWAYS run `npm install` after extracting!** 🔑
