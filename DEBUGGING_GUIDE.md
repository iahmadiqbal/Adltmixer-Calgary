# Profile Update Not Persisting - Debugging Guide

## Root Cause Analysis

The profile updates are showing in the UI but not persisting to the database. This could be due to several reasons:

1. **Backend server not running** - Most likely cause
2. **Database connection issue**
3. **Transaction not committing**
4. **Prisma Studio connected to different database**

## Step-by-Step Fix

### Step 1: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see output indicating the server is running (usually on port 3000 or 5000).

### Step 2: Test the Database Connection

Run the test script to verify database updates work:

```bash
cd backend
node test-db-update.js
```

This will test if Prisma can actually write to your database.

### Step 3: Test the Profile Update

1. Open your browser DevTools (F12)
2. Go to the Network tab
3. Navigate to your Profile page
4. Click "Edit Profile"
5. Change the bio field
6. Click "Save Changes"

### Step 4: Check the Logs

In your backend terminal, you should see detailed logs:

```
=== UPDATE MY PROFILE CONTROLLER ===
Request body: { firstName: "...", lastName: "...", bio: "..." }
User from token: <user-id>
Validating with schema...
Validated data: { ... }
Calling service...
=== UPDATE MY PROFILE SERVICE ===
User ID: <user-id>
Incoming data: { ... }
Update data to be sent to Prisma: { ... }
Update data keys: [ 'firstName', 'lastName', 'bio' ]
Prisma update result: { ... }
=== END UPDATE MY PROFILE SERVICE ===
```

### Step 5: Verify in Prisma Studio

```bash
cd backend
npx prisma studio
```

Refresh the User table and check if the bio field has been updated.

## Common Issues and Solutions

### Issue 1: Backend Not Running

**Symptom:** No logs appear, Network tab shows connection refused
**Solution:** Start the backend with `npm run dev`

### Issue 2: Wrong Database URL

**Symptom:** Backend runs but updates don't persist
**Solution:** Check `backend/.env` file - ensure DATABASE_URL is correct

### Issue 3: Prisma Studio Connected to Different DB

**Symptom:** Backend logs show success but Prisma Studio shows old data
**Solution:**

- Close Prisma Studio
- Restart it from the backend directory: `npx prisma studio`
- Refresh the browser

### Issue 4: Empty Update Data

**Symptom:** Logs show `Update data keys: []`
**Solution:** Frontend is not sending data correctly - check browser console

### Issue 5: Authentication Issue

**Symptom:** 401 Unauthorized error
**Solution:** Check if JWT token is valid and being sent in Authorization header

## Verification Checklist

- [ ] Backend server is running (`npm run dev`)
- [ ] No errors in backend console
- [ ] Network tab shows PATCH request to `/api/users/me/profile`
- [ ] Request returns 200 status
- [ ] Backend logs show update data with correct fields
- [ ] Prisma Studio shows updated values (after refresh)
- [ ] Other users can see the updated profile

## If Still Not Working

1. Check if you have multiple terminal windows running different backend instances
2. Verify PostgreSQL is running: `psql -U macbookair -d adultmixer -c "SELECT NOW();"`
3. Check for database locks or transactions
4. Try restarting PostgreSQL
5. Check backend error logs for any Prisma errors
