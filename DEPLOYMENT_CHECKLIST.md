# Render Deployment Checklist

## Quick Setup Guide

### 1. Database Setup (5 minutes)

- [ ] Create PostgreSQL database on Render
- [ ] Copy **Internal Database URL**
- [ ] Save URL securely (you'll need it next)

### 2. Backend Service Setup (10 minutes)

- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install && npm run build && npx prisma migrate deploy`
- [ ] Set Start Command: `npm start`

### 3. Environment Variables (5 minutes)

Add these in Render Environment tab:

```
DATABASE_URL=[Internal Database URL from step 1]
JWT_SECRET=[Generate with: openssl rand -base64 32]
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

### 4. Deploy & Verify (5 minutes)

- [ ] Wait for deployment to complete
- [ ] Check logs for: "🚀 Server running on port..."
- [ ] Test health endpoint: `https://your-backend.onrender.com/health`
- [ ] Copy backend URL

### 5. Update Frontend (5 minutes)

- [ ] Go to Vercel project settings
- [ ] Update `VITE_API_BASE_URL` to: `https://your-backend.onrender.com/api`
- [ ] Redeploy frontend
- [ ] Test login/signup functionality

---

## Environment Variables Quick Reference

| Variable       | Example                               | Where to Get                         |
| -------------- | ------------------------------------- | ------------------------------------ |
| DATABASE_URL   | `postgresql://user:pass@host:5432/db` | Render PostgreSQL Dashboard          |
| JWT_SECRET     | `abc123xyz...`                        | Generate: `openssl rand -base64 32`  |
| JWT_EXPIRES_IN | `7d`                                  | Your preference (7 days recommended) |
| FRONTEND_URL   | `https://app.vercel.app`              | Your Vercel deployment URL           |
| NODE_ENV       | `production`                          | Always "production" for Render       |

---

## Common Issues & Quick Fixes

### ❌ "Application failed to respond"

✅ Check DATABASE_URL is the **Internal** URL (not External)

### ❌ CORS errors in browser

✅ Verify FRONTEND_URL matches your Vercel URL exactly

### ❌ "JWT_SECRET is not defined"

✅ Add JWT_SECRET in Render environment variables

### ❌ Database connection timeout

✅ Use Internal Database URL and ensure same region

---

## Testing Your Deployment

### 1. Health Check

```bash
curl https://your-backend.onrender.com/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 2. Frontend Test

- Visit your Vercel app
- Browse profiles (should work without login)
- Try login/signup
- Check browser console for errors

---

## Production Ready Checklist

- [ ] Backend deployed on Render
- [ ] Database connected and migrations run
- [ ] All environment variables set
- [ ] Health endpoint responding
- [ ] Frontend updated with backend URL
- [ ] Login/signup working
- [ ] Profile browsing working
- [ ] No CORS errors
- [ ] No console errors

---

## Total Time: ~30 minutes

Need detailed instructions? See `RENDER_DEPLOYMENT_GUIDE.md`
