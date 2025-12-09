# ✅ Setup Checklist - Follow These Steps EXACTLY

## Before You Start

**Do you have Node.js installed?**

Check by running:
```bash
node --version
```

- ✅ If you see `v18.x.x` or higher → You're good!
- ❌ If you see "command not found" → Install Node.js from https://nodejs.org

---

## Step-by-Step Setup

### ☑️ Step 1: Navigate to the Project

```bash
cd instacart-calculator
```

**Verify you're in the right place:**
```bash
pwd
# Should show: .../instacart-calculator
```

**Verify files exist:**
```bash
ls
# Should show: src/ package.json index.html README.md etc.
```

---

### ☑️ Step 2: Install Dependencies

**⚠️ THIS IS THE MOST IMPORTANT STEP - DO NOT SKIP!**

```bash
npm install
```

**What you should see:**
- Text about "adding packages"
- Progress indicators
- Takes 30-60 seconds
- Ends with "added X packages"

**Verify installation worked:**
```bash
ls node_modules
# Should show lots of folders
```

**If you see an error here:**
- Make sure you have Node.js installed (see "Before You Start")
- Make sure you're in the `instacart-calculator` directory
- Try again with `npm install`

---

### ☑️ Step 3: Start the Development Server

```bash
npm run dev
```

**What you should see:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**If you see "Failed to load url /src/main.tsx":**
- ❌ You skipped Step 2!
- Stop the server (Ctrl+C)
- Go back to Step 2 and run `npm install`
- Then try `npm run dev` again

---

### ☑️ Step 4: Open in Browser

1. Look at your terminal for the URL (usually `http://localhost:5173`)
2. Copy that URL
3. Paste into your web browser
4. You should see the Instacart Profitability Calculator!

**What you should see in the browser:**
- Purple gradient header
- "Instacart Profitability Calculator" title
- Input fields on the left
- Results panel on the right

---

## ✅ Success Checklist

You've successfully set up the app if:
- ✅ Terminal shows "VITE ready" message
- ✅ Browser opens to localhost:5173
- ✅ You see the calculator interface
- ✅ You can type in the input fields
- ✅ No errors in the browser console (F12)

---

## ❌ Troubleshooting

### "Failed to load url /src/main.tsx"

**Cause:** You didn't run `npm install` or it failed

**Fix:**
```bash
# Press Ctrl+C to stop the server
npm install
npm run dev
```

---

### "npm: command not found"

**Cause:** Node.js is not installed

**Fix:**
1. Go to https://nodejs.org
2. Download the LTS version
3. Install it
4. Close and reopen your terminal
5. Try again from Step 1

---

### "Cannot find module"

**Cause:** Dependencies not installed properly

**Fix:**
```bash
rm -rf node_modules
npm install
npm run dev
```

---

### Port already in use

**Cause:** Another app is using port 5173

**Fix:** 
- Vite will automatically use port 5174, 5175, etc.
- Just open the URL shown in your terminal

---

### Still stuck?

Read the full [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide.

---

## Complete Command Summary

Here are ALL the commands you need, in order:

```bash
# 1. Check Node.js is installed
node --version

# 2. Navigate to project
cd instacart-calculator

# 3. Install dependencies (DO NOT SKIP!)
npm install

# 4. Start dev server
npm run dev

# 5. Open browser to http://localhost:5173
```

That's it! Four commands total.

---

## What NOT to Do

❌ Don't run `npm run dev` before `npm install`
❌ Don't skip `npm install`
❌ Don't run commands from the wrong directory
❌ Don't use an old version of Node.js (needs v18+)

---

## After Successful Setup

Once it's running:
- Try entering some numbers in the input fields
- Watch the results update in real-time
- Read [EXAMPLES.md](EXAMPLES.md) for sample scenarios
- Read [README.md](README.md) to understand all features

---

**Remember: The most common issue is forgetting to run `npm install` first!**
