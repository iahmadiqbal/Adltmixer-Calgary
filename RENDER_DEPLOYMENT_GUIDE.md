# Render Deployment Guide - Adultmixer Backend

## Prerequisites

- GitHub repository with your backend code
- Render account (free tier works)
- Vercel frontend URL

---

## Step 1: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure database:
   - **Name**: `adultmixer-db` (or your preferred name)
   - **Database**: `adultmixer`
   - **User**: (auto-generated)
   - **Region**: Choose closest to your users
   - **Plan**: Free (or paid for production)
4. Click **"Create Database"**
5. Wait for database to be created (takes ~2 minutes)
6. **IMPORTANT**: Copy the **Internal Database URL** (not External)
   - Format: `postgresql://user:password@host:5432/database`
   - You'll need this for the backend service

---

## Step 2: Create Web Service on Render

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:

### Basic Settings

- **Name**: `adultmixer-backend`
- **Region**: Same as database
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`

### Build & Deploy Settings

- **Build Command**:
  ```bash
  npm install && npm run build && npx prisma migrate deploy
  ```
- **Start Command**:
  ```bash
  npm start
  ```

### Instance Type

- **Plan**: Free (or paid for production)

---

## Step 3: Configure Environment Variables

In the Render web service settings, add these environment variables:

### Required Variables

| Key              | Value                                 | Notes                          |
| ---------------- | ------------------------------------- | ------------------------------ |
| `DATABASE_URL`   | `[Internal Database URL from Step 1]` | Copy from PostgreSQL service   |
| `JWT_SECRET`     | `[Generate a strong secret]`          | Use: `openssl rand -base64 32` |
| `JWT_EXPIRES_IN` | `7d`                                  | Token expiration time          |
| `FRONTEND_URL`   | `https://your-app.vercel.app`         | Your Vercel frontend URL       |
| `NODE_ENV`       | `production`                          | Environment mode               |

### How to Add Variables

1. Go to your web service dashboard
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add each variable from the table above
5. Click **"Save Changes"**

---

## Step 4: Deploy

1. After adding environment variables, Render will automatically deploy
2. Monitor the deployment logs:
   - Look for: `🚀 Server running on port...`
   - Check for any errors
3. Once deployed, you'll get a URL like: `https://adultmixer-backend.onrender.com`

---

## Step 5: Update Frontend Configuration

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL`:
   ```
   https://adultmixer-backend.onrender.com/api
   ```
4. Redeploy your frontend

---

## Step 6: Test Your Deployment

### Test Health Endpoint

```bash
curl https://adultmixer-backend.onrender.com/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test API Endpoints

1. Visit your Vercel frontend
2. Try to browse profiles (should work without login)
3. Try to login/signup
4. Check browser console for any errors

---

## Troubleshooting

### Issue: "Application failed to respond"

**Solution**: Check logs in Render dashboard

- Look for database connection errors
- Verify `DATABASE_URL` is correct (use Internal URL)
- Check if Prisma migrations ran successfully

### Issue: "CORS error" in frontend

**Solution**:

- Verify `FRONTEND_URL` is set correctly in Render
- Make sure it matches your Vercel URL exactly
- Check if URL includes `https://` (no trailing slash)

### Issue: "JWT_SECRET is not defined"

**Solution**:

- Go to Render environment variables
- Add `JWT_SECRET` with a strong random value
- Redeploy the service

### Issue: Database connection timeout

**Solution**:

- Use **Internal Database URL** (not External)
- Ensure database and web service are in same region
- Check database is running (green status)

### Issue: Prisma migrations fail

**Solution**:

- Check build logs for migration errors
- Manually run migrations:
  1. Go to Render Shell (in web service dashboard)
  2. Run: `npx prisma migrate deploy`

---

## Important Notes

### Free Tier Limitations

- **Render Free Tier**: Service spins down after 15 minutes of inactivity
- **First request after spin-down**: Takes 30-60 seconds to wake up
- **Database**: Free tier has 90-day expiration (upgrade for production)

### Production Recommendations

1. **Upgrade to Paid Plan**: For always-on service
2. **Use Strong JWT Secret**: Generate with `openssl rand -base64 32`
3. **Enable Auto-Deploy**: In Render settings (deploys on git push)
4. **Set up Monitoring**: Use Render's built-in monitoring
5. **Database Backups**: Paid plans include automatic backups

---

## Environment Variables Reference

### Complete List

```env
# Database (from Render PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT Configuration
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=7d

# Frontend (from Vercel)
FRONTEND_URL=https://your-app.vercel.app

# Environment
NODE_ENV=production

# Port (Render sets this automatically)
PORT=10000
```

---

## Deployment Checklist

### Before Deployment

- [ ] Backend code pushed to GitHub
- [ ] PostgreSQL database created on Render
- [ ] Internal Database URL copied
- [ ] Strong JWT secret generated
- [ ] Vercel frontend URL ready

### During Deployment

- [ ] Web service created and connected to GitHub
- [ ] Build command set correctly
- [ ] Start command set correctly
- [ ] All environment variables added
- [ ] Deployment successful (check logs)

### After Deployment

- [ ] Health endpoint responds
- [ ] Frontend updated with backend URL
- [ ] Frontend redeployed
- [ ] Login/signup works
- [ ] Profile browsing works
- [ ] No CORS errors

---

## Useful Commands

### Generate JWT Secret

```bash
openssl rand -base64 32
```

### Test Backend Locally with Production DB

```bash
# In backend/.env
DATABASE_URL="[Render Internal Database URL]"
npm run dev
```

### Manual Migration Deploy

```bash
cd backend
npx prisma migrate deploy
```

### View Prisma Studio (Database GUI)

```bash
cd backend
npx prisma studio
```

---

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## Quick Deploy Summary

1. **Create PostgreSQL database** on Render
2. **Copy Internal Database URL**
3. **Create Web Service** connected to GitHub
4. **Set environment variables** (DATABASE_URL, JWT_SECRET, FRONTEND_URL, NODE_ENV)
5. **Deploy** and monitor logs
6. **Update Vercel** with backend URL
7. **Test** all functionality

Your backend should now be live at: `https://your-service.onrender.com` 🚀
