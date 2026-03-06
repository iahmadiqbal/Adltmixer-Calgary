# Render Quick Start - 5 Steps

## Step 1: Create Database (2 min)

1. Render Dashboard → New + → PostgreSQL
2. Name: `adultmixer-db`
3. Create Database
4. **Copy Internal Database URL** ⚠️

## Step 2: Create Web Service (3 min)

1. New + → Web Service
2. Connect GitHub repo
3. Settings:
   - Root Directory: `backend`
   - Build: `npm install && npm run build && npx prisma migrate deploy`
   - Start: `npm start`

## Step 3: Add Environment Variables (2 min)

```
DATABASE_URL=[Paste Internal URL from Step 1]
JWT_SECRET=[Run: openssl rand -base64 32]
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

## Step 4: Deploy & Test (3 min)

1. Wait for deployment
2. Test: `curl https://your-backend.onrender.com/health`
3. Should return: `{"status":"ok",...}`

## Step 5: Update Frontend (2 min)

1. Vercel → Settings → Environment Variables
2. Update: `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
3. Redeploy frontend

---

## ⚠️ Important Notes

- Use **Internal Database URL** (not External)
- Generate strong JWT_SECRET: `openssl rand -base64 32`
- FRONTEND_URL must match Vercel URL exactly
- Free tier: 15 min spin-down (upgrade for production)

---

## 🧪 Quick Test

```bash
# Health check
curl https://your-backend.onrender.com/health

# Should return
{"status":"ok","timestamp":"..."}
```

---

## 📚 Need More Help?

- Detailed guide: `RENDER_DEPLOYMENT_GUIDE.md`
- Checklist: `DEPLOYMENT_CHECKLIST.md`
- Full summary: `BACKEND_PRODUCTION_READY.md`

---

**Total Time: ~12 minutes** ⏱️
