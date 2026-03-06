# 🧪 Testing Email Verification Without Resend

## Development Mode (No API Key)

If you don't have a Resend API key yet, the app will work in **development mode**:

### What Happens

1. ✅ User signup works normally
2. ✅ Verification token is created in database
3. ⚠️ Email is NOT sent (no API key)
4. ✅ Verification link is printed to console
5. ✅ You can manually copy the link to test

### Console Output

When a user signs up, you'll see:

```
⚠️  RESEND_API_KEY not set - Skipping email send
📧 Verification link: http://localhost:5173/verify-email?token=abc123...
```

### How to Test

1. **Sign up** with any email
2. **Check backend console** for the verification link
3. **Copy the link** and paste in browser
4. **Email gets verified** ✅
5. **Login works** ✅

---

## Getting Verification Link from Database

If you missed the console output, you can get the token from the database:

### Using Prisma Studio

```bash
cd backend
npx prisma studio
```

1. Open `EmailVerificationToken` table
2. Find your user's token
3. Copy the token value
4. Visit: `http://localhost:5173/verify-email?token=YOUR_TOKEN`

### Using SQL

```sql
SELECT token FROM "EmailVerificationToken"
WHERE "userId" = 'your-user-id';
```

---

## Production Setup

For production, you MUST add a real Resend API key:

### Step 1: Get API Key

1. Go to [resend.com](https://resend.com)
2. Sign up (free tier available)
3. Create API key
4. Copy the key (starts with `re_`)

### Step 2: Add to Railway

1. Railway dashboard → Backend project
2. Variables tab
3. Add: `RESEND_API_KEY=re_your_key_here`
4. Save (auto-redeploys)

### Step 3: Test

1. Sign up on production site
2. Check email inbox
3. Click verification link
4. Login!

---

## Environment Variables

### Local (.env)

```env
DATABASE_URL="postgresql://..."
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d
FRONTEND_URL="http://localhost:5173"
RESEND_API_KEY=re_your_key_here  # Optional for local dev
```

### Production (Railway)

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-production-secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
RESEND_API_KEY=re_your_key_here  # REQUIRED for production
```

---

## Non-Blocking Email Sending

Email sending is now **fire-and-forget**:

- ✅ Signup returns immediately
- ✅ Email sends in background
- ✅ No timeout issues
- ✅ If email fails, user can resend

### Before (Blocking)

```typescript
await EmailService.sendVerificationEmail(...);  // Waits for email
return response;  // Delayed response
```

### After (Non-Blocking)

```typescript
EmailService.sendVerificationEmail(...).catch(console.error);  // Fire and forget
return response;  // Instant response ⚡
```

---

## Troubleshooting

### Error: "RESEND_API_KEY is not defined"

**Solution**: This error only appears in production now. For local dev, it's optional.

### Signup Times Out

**Fixed!** Email sending is now non-blocking. Signup returns instantly.

### Email Not Received

**Check:**

1. Spam folder
2. Resend logs: [resend.com/logs](https://resend.com/logs)
3. Backend console for errors

**Solution**: Use `/resend-verification` page

### Can't Login

**Check:**

1. Email is verified (check database)
2. No typos in email/password
3. Account exists

**Solution**: Verify email first, then login

---

## Testing Checklist

### Local Development (No Resend)

- [ ] Sign up works
- [ ] Token created in database
- [ ] Verification link in console
- [ ] Copy link and verify manually
- [ ] Login works after verification

### Production (With Resend)

- [ ] Sign up works
- [ ] Email received in inbox
- [ ] Click verification link
- [ ] Email verified
- [ ] Login works

---

## Quick Commands

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
npm run dev
```

### Check Database

```bash
cd backend
npx prisma studio
```

### View Logs

```bash
# Backend console shows verification links
# Railway dashboard → Logs tab for production
```

---

**Status**: ✅ Works without Resend API key in development!

**Production**: Add Resend API key to Railway for real emails.
