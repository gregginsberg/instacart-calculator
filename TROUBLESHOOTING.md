# 🔧 Troubleshooting Guide

## Common Setup Issues

### ❌ "Failed to load url /src/main.tsx"

**Problem:** Vite can't find the main.tsx file

**Solution:**
1. Make sure you're in the correct directory:
   ```bash
   cd instacart-calculator
   ```

2. Make sure you ran `npm install` BEFORE `npm run dev`:
   ```bash
   npm install
   npm run dev
   ```

3. If still not working, verify the file exists:
   ```bash
   ls src/main.tsx
   ```

4. Clean install:
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

---

### ❌ "npm: command not found"

**Problem:** Node.js is not installed

**Solution:**
1. Install Node.js from https://nodejs.org (v18 or higher)
2. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

### ❌ "Cannot find module" errors

**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
```

Make sure you're in the `instacart-calculator` directory when running this.

---

### ❌ "Port 5173 is already in use"

**Problem:** Another app is using that port

**Solution:**
- Vite will automatically try 5174, 5175, etc.
- Or kill the process using the port:
  ```bash
  # On Mac/Linux
  lsof -ti:5173 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```

---

### ❌ Changes not appearing in browser

**Problem:** Dev server not running or cache issue

**Solution:**
1. Make sure `npm run dev` is running
2. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
3. Clear browser cache
4. Restart dev server (Ctrl+C, then `npm run dev`)

---

### ❌ "Permission denied" errors

**Problem:** File permissions issue

**Solution:**
```bash
# On Mac/Linux, don't use sudo with npm
# Instead, fix npm permissions or use nvm

# Quick fix for current project:
sudo chown -R $USER .
```

---

### ❌ TypeScript errors in editor

**Problem:** VS Code or editor showing errors

**Solution:**
1. Install dependencies first: `npm install`
2. Restart your editor
3. If using VS Code, install "TypeScript and JavaScript Language Features"

---

### ❌ Build fails

**Problem:** `npm run build` shows errors

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Check TypeScript errors: `npx tsc --noEmit`
3. Clear cache and rebuild:
   ```bash
   rm -rf dist
   npm run build
   ```

---

## Step-by-Step Clean Install

If you're having persistent issues, try this:

```bash
# 1. Navigate to project
cd instacart-calculator

# 2. Remove any existing installations
rm -rf node_modules
rm -rf dist
rm package-lock.json  # Optional

# 3. Fresh install
npm install

# 4. Run dev server
npm run dev
```

---

## Verifying Your Setup

Run these commands to verify everything is correct:

```bash
# Check Node.js version (should be v18+)
node --version

# Check npm version
npm --version

# Check if all files exist
ls -la src/main.tsx
ls -la src/App.tsx
ls -la package.json

# Check if dependencies installed
ls -la node_modules
```

---

## Getting Help

If you're still stuck:

1. **Check the error message carefully** - It usually tells you what's wrong
2. **Read the console output** - Look for the specific error
3. **Check all files exist** - Use `ls` or your file explorer
4. **Verify you're in the right directory** - Use `pwd` to check
5. **Try the clean install steps above**

---

## Common Mistakes

### ❌ Wrong directory
```bash
# Wrong - in parent directory
npm run dev  # Error!

# Right - in project directory
cd instacart-calculator
npm run dev  # Works!
```

### ❌ Skipping npm install
```bash
# Wrong - running dev before install
npm run dev  # Error!

# Right - install first
npm install
npm run dev  # Works!
```

### ❌ Using old Node version
```bash
# Check your version
node --version  # Should be v18+

# If less than v18, update Node.js
```

---

## Still Need Help?

If none of these solutions work:

1. Check the error message in your terminal - what exactly does it say?
2. Verify all the files were extracted correctly
3. Make sure you have the latest Node.js installed
4. Try on a different computer to rule out environment issues

Most issues are solved by:
1. Installing Node.js correctly
2. Running `npm install` before `npm run dev`
3. Being in the correct directory
