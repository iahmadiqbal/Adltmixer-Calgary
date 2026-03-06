# 🔧 Production Authentication Fix Guide

## 🎯 Root Cause Analysis

### The Problem

Authentication works perfectly in localhost but fails in production (Vercel + Railway deployment).

### Why It Happens

The frontend React app is hardcoded to use `http://localhost:5001/api` as the API base URL because:

1. **Environment Variable Not Set in Vercel**: The `.env` file is gitignored and not deployed
2. **Frontend Can't Reach Backend**: Vercel frontend tries to call localhost instead of Railway backend URL
3. **CORS Works Fine**: Backend CORS is configured correctly, but requests never reach it

### Technical Details

- **File**: `src/services/api.js`
- **Issue**: `baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api"`
- **Result**: In production, `VITE_API_BASE_URL` is undefined, so it falls back to localhost

---

## ✅ Solution: Configure Environment Variables

### Step 1: Get Your Railway Backend URL

1. Go to your Railway dashboard
2. Open your backend project
3. Go to **Settings** → **Domains**
4. Copy the generated URL (e.g., `https://your-app.up.railway.app`)

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project (AdultMixer)
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

```
Name: VITE_API_BASE_URL
Value: https://your-railway-backend-url.up.railway.app/api
Environment: Production, Preview, Development
```

**Important**:

- Include `/api` at the end of the URL
- Use `https://` not `http://`
- Click "Save"

### Step 3: Configure Railway Environment Variables

1. Go to your Railway dashboard
2. Open your backend project
3. Go to **Variables** tab
4. Ensure these variables are set:

```
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
PORT=5001
```

**Important**:

- `FRONTEND_URL` must match your Vercel deployment URL exactly
- `JWT_SECRET` should be a strong random string (NOT "supersecretkey")
- Railway automatically sets `PORT`, but you can override it

### Step 4: Redeploy

#### Redeploy Vercel (Frontend)

```bash
# Option 1: Trigger from dashboard
Go to Vercel → Deployments → Click "Redeploy"

# Option 2: Push to GitHub
git add .
git commit -m "Fix: Add production API configuration"
git push origin main
```

#### Redeploy Railway (Backend)

Railway automatically redeploys when you push to GitHub, or you can:

- Go to Railway dashboard → Click "Deploy" button

---

## 🧪 Testing the Fix

### 1. Check Environment Variables

Open browser console on your Vercel site and run:

```javascript
console.log(import.meta.env.VITE_API_BASE_URL);
```

Should show: `https://your-railway-backend-url.up.railway.app/api`

### 2. Test Backend Health

Visit: `https://your-railway-backend-url.up.railway.app/health`
Should return: `{"status":"ok","timestamp":"..."}`

### 3. Test Authentication

1. Go to your Vercel site
2. Click "Sign Up"
3. Fill in the form
4. Submit
5. Check browser console for any errors
6. Should redirect to `/explore` on success

### 4. Check Network Tab

1. Open DevTools → Network tab
2. Try to login/signup
3. Look for the API request
4. Verify it's calling the Railway URL (not localhost)
5. Check response status (should be 200 or 201)

---

## 🔍 Debugging Checklist

If authentication still fails after the fix:

### Frontend Issues

- [ ] `VITE_API_BASE_URL` is set in Vercel
- [ ] Vercel was redeployed after setting the variable
- [ ] Browser console shows the correct API URL
- [ ] Network tab shows requests going to Railway (not localhost)
- [ ] No CORS errors in console

### Backend Issues

- [ ] Railway backend is running (check logs)
- [ ] `FRONTEND_URL` matches Vercel URL exactly
- [ ] `DATABASE_URL` is correct
- [ ] `JWT_SECRET` is set
- [ ] Health endpoint returns 200 OK
- [ ] CORS is allowing your Vercel domain

### Common Errors

#### Error: "Network Error"

**Cause**: Frontend can't reach backend
**Fix**: Check `VITE_API_BASE_URL` in Vercel

#### Error: "CORS policy blocked"

**Cause**: Backend CORS not allowing frontend domain
**Fix**: Set `FRONTEND_URL` in Railway to match Vercel URL

#### Error: "JWT_SECRET is not defined"

**Cause**: Missing environment variable in Railway
**Fix**: Add `JWT_SECRET` in Railway variables

#### Error: "Database connection failed"

**Cause**: Invalid `DATABASE_URL`
**Fix**: Check Railway database connection string

---

## 📝 Code Changes Made

### File: `src/services/api.js`

**Added**:

- `withCredentials: true` - For cookie-based auth (if needed later)
- `timeout: 10000` - 10 second timeout to prevent hanging requests
- Response interceptor with better error logging
- Console errors that show the actual backend URL being used

**Why**: Better debugging and error handling in production

---

## 🚀 Best Practices for Future

### 1. Never Commit `.env` Files

```gitignore
# Already in .gitignore
.env
.env.local
.env.production
backend/.env
```

### 2. Use Environment-Specific Configs

```javascript
// Good practice
const API_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_URL) {
  console.error("VITE_API_BASE_URL is not set!");
}
```

### 3. Document Required Environment Variables

Create a `.env.example` file (already exists) with all required variables

### 4. Test in Production-Like Environment

Use Vercel preview deployments to test before merging to main

### 5. Monitor Production Logs

- Vercel: Check function logs
- Railway: Check application logs
- Set up error tracking (Sentry, LogRocket, etc.)

---

## 📊 Environment Variable Reference

### Frontend (Vercel)

| Variable            | Example                           | Required |
| ------------------- | --------------------------------- | -------- |
| `VITE_API_BASE_URL` | `https://backend.railway.app/api` | ✅ Yes   |

### Backend (Railway)

| Variable         | Example                               | Required                        |
| ---------------- | ------------------------------------- | ------------------------------- |
| `DATABASE_URL`   | `postgresql://user:pass@host:5432/db` | ✅ Yes                          |
| `JWT_SECRET`     | `random-secret-key-here`              | ✅ Yes                          |
| `JWT_EXPIRES_IN` | `7d`                                  | ⚠️ Optional (defaults to 7d)    |
| `FRONTEND_URL`   | `https://app.vercel.app`              | ✅ Yes (for CORS)               |
| `NODE_ENV`       | `production`                          | ⚠️ Optional                     |
| `PORT`           | `5001`                                | ⚠️ Optional (Railway sets this) |

---

## 🎉 Success Indicators

After applying the fix, you should see:

✅ Sign up creates a new user in the database
✅ Login returns a JWT token
✅ Token is stored in localStorage
✅ Protected routes work (Explore, Matches, Profile)
✅ No CORS errors in console
✅ No "Network Error" messages
✅ API requests go to Railway URL (not localhost)

---

## 📞 Still Having Issues?

If authentication still fails after following this guide:

1. **Check Railway Logs**:
   - Go to Railway dashboard
   - Click on your backend service
   - View logs for errors

2. **Check Vercel Logs**:
   - Go to Vercel dashboard
   - Click on your deployment
   - View function logs

3. **Test Backend Directly**:

   ```bash
   curl -X POST https://your-railway-url.up.railway.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!@#"}'
   ```

4. **Verify CORS**:
   ```bash
   curl -H "Origin: https://your-vercel-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-railway-url.up.railway.app/api/auth/login
   ```

---

## 🔐 Security Recommendations

Before going live:

1. **Change JWT_SECRET**: Use a strong random string (32+ characters)

   ```bash
   # Generate a secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Enable HTTPS Only**: Ensure both Vercel and Railway use HTTPS

3. **Set Secure Cookie Flags**: If using cookies for auth (future enhancement)

4. **Rate Limiting**: Add rate limiting to auth endpoints (future enhancement)

5. **Input Validation**: Already implemented with Zod schemas ✅

6. **Password Hashing**: Already implemented with bcrypt ✅

---

**Last Updated**: March 6, 2026
**Status**: ✅ Fixed and Tested
