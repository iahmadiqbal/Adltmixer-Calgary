# Profile Update Testing Guide

## Changes Made

1. **Removed Framer Motion from Edit/Save/Cancel buttons** - Motion components can sometimes interfere with onClick handlers
2. **Added extensive console logging** - Every action now logs to console
3. **Added alert on Save** - Immediate visual feedback when Save is clicked
4. **Separated handler functions** - handleEditClick, handleSaveClick, handleCancelClick for clarity
5. **Added render logging** - Shows isOwnProfile and isEditing state on every render

## Testing Steps

### Step 1: Verify Backend is Running

Open terminal and check if backend is running on port 5001:

```bash
# Check if process is listening on port 5001
lsof -i :5001

# Or try to curl the health endpoint
curl http://localhost:5001/api/health
```

If not running, start it:

```bash
cd backend
npm run dev
```

You should see: `🚀 Server running on port 5001`

### Step 2: Open Browser DevTools

1. Open your app in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Go to Network tab
5. Filter Network by "Fetch/XHR"

### Step 3: Navigate to Profile

1. Make sure you're logged in
2. Navigate to your profile page (usually `/profile` or click profile link)
3. Check console - you should see:
   ```
   Fetching profile, id: undefined
   Fetching current user profile
   Profile response: { ... }
   Profile render - isOwnProfile: true isEditing: false
   ```

### Step 4: Click Edit Profile

1. Click "Edit Profile" button
2. Check console - you should see:
   ```
   Edit button clicked - setting isEditing to true
   Profile render - isOwnProfile: true isEditing: true
   ```
3. You should now see input fields for firstName, lastName, bio, and profileImageUrl

### Step 5: Modify Bio

1. Click in the bio textarea
2. Type something new
3. Check console - you should see:
   ```
   Field changed: bio = <your new text>
   ```

### Step 6: Click Save Changes

1. Click "Save Changes" button
2. **IMMEDIATELY** you should see an alert: "HANDLE SAVE EXECUTED - Check console and Network tab!"
3. Check console - you should see:
   ```
   === SAVE CLICKED ===
   isEditing: true
   Sending data: { firstName: "...", lastName: "...", bio: "...", profileImageUrl: "..." }
   Making API call to PATCH /users/me/profile
   ```
4. Check Network tab - you should see:
   - Request: PATCH http://localhost:5001/api/users/me/profile
   - Status: 200 (if successful)
   - Request Payload: Your form data
   - Response: Updated user object

### Step 7: Check Backend Logs

In your backend terminal, you should see:

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
Update data keys: [ 'firstName', 'lastName', 'bio', 'profileImageUrl' ]
Prisma update result: { ... }
=== END UPDATE MY PROFILE SERVICE ===
```

### Step 8: Verify in Prisma Studio

```bash
cd backend
npx prisma studio
```

1. Open User table
2. Find your user by email
3. Check the `bio` field - it should show your new text
4. Check `updatedAt` - it should be recent

## Troubleshooting

### Issue: Alert doesn't appear when clicking Save

**Cause:** JavaScript error or button not rendering
**Solution:**

- Check browser console for errors
- Verify isEditing is true (check console logs)
- Try clicking the button multiple times

### Issue: Alert appears but no Network request

**Cause:** Error in handleSave before API call
**Solution:**

- Check console for error messages
- Verify api service is imported correctly
- Check if token exists: `localStorage.getItem('token')`

### Issue: Network request shows 401 Unauthorized

**Cause:** Invalid or missing JWT token
**Solution:**

- Check localStorage: `localStorage.getItem('token')`
- Try logging out and logging back in
- Check backend logs for authentication errors

### Issue: Network request shows 404 Not Found

**Cause:** Route not registered or wrong URL
**Solution:**

- Verify backend route exists: Check `backend/src/core/modules/user/user.routes.ts`
- Verify route is mounted: Check `backend/src/routes/index.ts`
- Check API base URL in `src/services/api.js` (should be http://localhost:5001/api)

### Issue: 200 response but database not updated

**Cause:** Prisma update not executing or wrong database
**Solution:**

- Check backend logs - look for "Update data keys" - should NOT be empty
- Run test script: `cd backend && node test-db-update.js`
- Verify DATABASE_URL in `backend/.env`
- Check if Prisma Studio is connected to same database

### Issue: Empty "Update data keys" in backend logs

**Cause:** Frontend sending empty object or wrong field names
**Solution:**

- Check "Sending data" in browser console
- Verify field names match: firstName, lastName, bio, profileImageUrl
- Check if formData state is populated

## Quick Diagnostic Commands

```bash
# Check if backend is running
lsof -i :5001

# Check database connection
cd backend
node test-db-update.js

# Check Prisma schema
cd backend
npx prisma studio

# View backend logs in real-time
cd backend
npm run dev

# Check if token exists (in browser console)
localStorage.getItem('token')

# Check current user (in browser console)
fetch('http://localhost:5001/api/users/me/profile', {
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
}).then(r => r.json()).then(console.log)
```

## Success Criteria

✅ Alert appears when clicking Save
✅ Console shows "=== SAVE CLICKED ==="
✅ Network tab shows PATCH request
✅ Backend logs show update data
✅ Response status is 200
✅ Prisma Studio shows updated bio
✅ Other users can see updated profile
