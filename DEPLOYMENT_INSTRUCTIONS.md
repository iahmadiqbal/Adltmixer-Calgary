# Deployment Instructions

## Environment Variables Setup

### Frontend (Vercel)

Add the following environment variable in your Vercel project settings:

```
VITE_API_BASE_URL=https://your-backend-production-url.com/api
```

**Important:** Replace `your-backend-production-url.com` with your actual backend deployment URL.

### Backend

Ensure your backend is deployed and accessible at the URL you configured above.

## Changes Made

### Issue 1: Explore Page - Public Access

- ✅ Created `optionalAuthenticate` middleware that allows both authenticated and unauthenticated access
- ✅ Updated `/users/discover` route to use optional authentication
- ✅ Modified `UserService.discover()` to return:
  - **Authenticated users**: Personalized results based on preferences
  - **Unauthenticated users**: All public profiles
- ✅ Updated Explore page to redirect to login when user tries to like without authentication

### Issue 2: Matches Page - Login Required

- ✅ Added authentication check in Matches page
- ✅ Shows "Please login to see your matches" message when not authenticated
- ✅ No API call is made when user is not logged in
- ✅ Redirects to login page with a button

### Issue 3: Production API Configuration

- ✅ Updated `src/services/api.js` to use environment variable `VITE_API_BASE_URL`
- ✅ Falls back to `http://localhost:5001/api` for local development
- ✅ Created `.env.example` file for reference
- ✅ Created `.env` file for local development

## Testing

### Local Testing

1. Ensure `.env` file exists with:
   ```
   VITE_API_BASE_URL=http://localhost:5001/api
   ```
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `npm run dev`
4. Test scenarios:
   - Visit `/explore` without login → Should show profiles
   - Try to like without login → Should prompt to login
   - Visit `/matches` without login → Should show login message
   - Login and visit `/matches` → Should show matches

### Production Testing

1. Deploy backend first
2. Update Vercel environment variable with backend URL
3. Redeploy frontend
4. Test same scenarios as above

## Vercel Deployment Steps

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add new variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend-url.com/api`
   - **Environment**: Production (and Preview if needed)
4. Redeploy your application

## Notes

- The frontend will automatically use the correct API URL based on the environment
- No code changes needed when switching between development and production
- All existing authentication flows remain intact
- UI design has not been modified
