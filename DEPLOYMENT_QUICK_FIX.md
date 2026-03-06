# ⚡ Quick Fix for Production Authentication

## 🚨 The Problem

Authentication fails in production because the frontend is trying to call `localhost` instead of your Railway backend.

## ✅ The Solution (5 Minutes)

### Step 1: Get Railway Backend URL

1. Open Railway dashboard
2. Go to your backend project
3. Copy the domain (e.g., `https://adultmixer-backend.up.railway.app`)

### Step 2: Set Vercel Environment Variable

1. Open Vercel dashboard
2. Go to your project → Settings → Environment Variables
3. Add new variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-railway-url.up.railway.app/api` (include `/api`)
   - **Environments**: Check all (Production, Preview, Development)
4. Click Save

### Step 3: Set Railway Environment Variables

1. Open Railway dashboard
2. Go to your backend project → Variables
3. Ensure these exist:
   - `FRONTEND_URL` = `https://your-vercel-app.vercel.app`
   - `JWT_SECRET` = (a strong random string, NOT "supersecretkey")
   - `DATABASE_URL` = (your PostgreSQL connection string)

### Step 4: Redeploy

1. **Vercel**: Go to Deployments → Click "Redeploy" on latest deployment
2. **Railway**: Should auto-deploy, or click "Deploy" button

### Step 5: Test

1. Visit your Vercel site
2. Try to sign up or login
3. Should work! ✅

---

## 🔍 Quick Test

Open browser console on your Vercel site:

```javascript
// Should show your Railway URL, not localhost
console.log(import.meta.env.VITE_API_BASE_URL);
```

---

## ❌ Common Mistakes

1. **Forgot `/api` at the end**: URL should be `https://backend.railway.app/api`
2. **Used `http://` instead of `https://`**: Always use HTTPS in production
3. **Didn't redeploy after setting variables**: Vercel needs a redeploy to pick up new env vars
4. **FRONTEND_URL doesn't match**: Must be exact Vercel URL (with https://)

---

## 📝 What Was Changed in Code

**File**: `src/services/api.js`

- Added timeout (10 seconds)
- Added better error logging
- Added `withCredentials: true` for future cookie support

**No other code changes needed!** This is purely a configuration issue.

---

## 🎯 Why This Happened

The `.env` file is gitignored (for security), so it doesn't get deployed to Vercel. Environment variables must be set in the Vercel dashboard instead.

---

## 📞 Still Not Working?

See the detailed guide: `PRODUCTION_FIX_GUIDE.md`
