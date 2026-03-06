# 📧 Email Verification Setup Guide

## ✅ What Was Implemented

Email verification system using Resend for AdultMixer Calgary:

1. ✅ Users created with `emailVerified: false`
2. ✅ Secure random token generated and saved in DB (24-hour expiry)
3. ✅ Verification email sent via Resend with branded template
4. ✅ `/api/auth/verify-email?token=xxx` endpoint added
5. ✅ Email verification marks user as verified and deletes token
6. ✅ Login blocked for unverified users (403 error)
7. ✅ Prisma migration created for `EmailVerificationToken` table
8. ✅ Resend verification email endpoint added
9. ✅ Frontend verification pages created

---

## 🚀 Setup Instructions

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy the API key (starts with `re_`)

### Step 2: Add to Local Environment

Add to `backend/.env`:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Step 3: Add to Railway (Production)

1. Go to Railway dashboard
2. Open your backend project
3. Go to **Variables** tab
4. Add new variable:
   ```
   RESEND_API_KEY = re_your_api_key_here
   ```
5. Save

### Step 4: Run Database Migration

```bash
cd backend
npx prisma migrate deploy
```

This creates the `EmailVerificationToken` table in production.

### Step 5: Deploy

```bash
# Commit and push changes
git add .
git commit -m "feat: Add email verification with Resend"
git push origin main
```

Railway and Vercel will auto-deploy.

---

## 📝 How It Works

### Registration Flow

1. User signs up → Account created with `emailVerified: false`
2. Verification token generated (32-byte random hex)
3. Token saved in DB with 24-hour expiry
4. Email sent via Resend with verification link
5. User redirected to login page with message

### Verification Flow

1. User clicks link in email → `/verify-email?token=xxx`
2. Frontend calls `/api/auth/verify-email?token=xxx`
3. Backend validates token and expiry
4. User's `emailVerified` set to `true`
5. Token deleted from database
6. Success message shown, redirect to login

### Login Flow

1. User tries to login
2. Backend checks `emailVerified` status
3. If `false` → 403 error with message
4. Frontend shows error and offers to resend verification
5. If `true` → Login successful

---

## 🎨 Email Template

Beautiful branded email with:

- AdultMixer Calgary branding
- Gradient pink/purple design
- Clear call-to-action button
- Fallback link for copy/paste
- 24-hour expiry notice
- Professional footer

---

## 🔧 API Endpoints

### POST `/api/auth/register`

Creates user and sends verification email.

**Response:**

```json
{
  "user": { ... },
  "token": "jwt-token",
  "message": "Registration successful! Please check your email..."
}
```

### GET `/api/auth/verify-email?token=xxx`

Verifies email address.

**Response:**

```json
{
  "message": "Email verified successfully! You can now log in.",
  "user": {
    "id": "...",
    "email": "...",
    "emailVerified": true
  }
}
```

### POST `/api/auth/resend-verification`

Resends verification email.

**Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "Verification email sent! Please check your inbox."
}
```

### POST `/api/auth/login`

Login (blocks unverified users).

**Error (403):**

```json
{
  "message": "Please verify your email before logging in..."
}
```

---

## 🎯 Frontend Pages

### `/verify-email?token=xxx`

- Shows loading spinner while verifying
- Success: Green checkmark, redirect to login
- Error: Red X, option to request new link

### `/resend-verification`

- Email input form
- Sends new verification email
- Shows success message

### `/signup`

- After registration, shows verification message
- Redirects to login page

### `/login`

- If unverified, shows 403 error
- Offers to resend verification email

---

## 🧪 Testing

### Test Locally

1. **Start backend:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend:**

   ```bash
   npm run dev
   ```

3. **Sign up with real email**
4. **Check inbox for verification email**
5. **Click verification link**
6. **Try to login**

### Test in Production

1. Deploy to Railway + Vercel
2. Sign up on production site
3. Check email (might go to spam!)
4. Verify and login

---

## 🔍 Troubleshooting

### Email Not Received

**Check:**

- Resend API key is correct in Railway
- Email might be in spam folder
- Check Resend dashboard for delivery status
- Verify `FRONTEND_URL` is correct in Railway

**Solution:**

- Use `/resend-verification` page
- Check Resend logs at [resend.com/logs](https://resend.com/logs)

### Verification Link Expired

**Error:** "Verification token has expired"

**Solution:**

- Go to `/resend-verification`
- Enter email
- Get new verification link

### Can't Login After Verification

**Check:**

- Database connection is working
- `emailVerified` is `true` in database
- No typos in email/password

**Solution:**

- Check Railway logs for errors
- Verify database migration ran successfully

### 403 Error on Login

**This is expected!** It means email is not verified yet.

**Solution:**

- Check email for verification link
- Use `/resend-verification` to get new link

---

## 📊 Database Schema

### EmailVerificationToken Table

```prisma
model EmailVerificationToken {
  id        String   @id @default(uuid())
  userId    String   @unique
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([token])
  @@index([expiresAt])
}
```

**Fields:**

- `id`: Unique identifier
- `userId`: Links to User (one token per user)
- `token`: 32-byte random hex string
- `expiresAt`: 24 hours from creation
- `createdAt`: Timestamp

---

## 🔐 Security Features

1. **Secure Token Generation**: `crypto.randomBytes(32)` - cryptographically secure
2. **Token Expiry**: 24 hours, automatically checked
3. **One-Time Use**: Token deleted after verification
4. **Unique Tokens**: Database constraint ensures uniqueness
5. **HTTPS Only**: Production uses HTTPS for all requests
6. **No Password in Email**: Only verification link sent

---

## 🎨 Customization

### Change Email Sender

Edit `backend/src/core/services/email.service.ts`:

```typescript
from: "onboarding@resend.dev", // Change this
```

**Note:** With free Resend, you can only use `onboarding@resend.dev`. For custom domain, upgrade to paid plan.

### Change Email Template

Edit `backend/src/core/services/email.service.ts` - modify the HTML template.

### Change Token Expiry

Edit `backend/src/core/modules/auth/auth.service.ts`:

```typescript
expiresAt.setHours(expiresAt.getHours() + 24); // Change 24 to desired hours
```

---

## 📈 Next Steps

### Optional Enhancements

1. **Email Templates**: Use React Email for better templates
2. **Rate Limiting**: Limit resend requests (e.g., 1 per 5 minutes)
3. **Email Queue**: Use Bull/BullMQ for background email sending
4. **Analytics**: Track verification rates
5. **Reminders**: Send reminder emails after 24 hours
6. **Custom Domain**: Set up custom email domain in Resend

---

## 🆘 Support

### Resend Documentation

- [Resend Docs](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)

### Check Logs

- **Railway**: Dashboard → Logs tab
- **Resend**: [resend.com/logs](https://resend.com/logs)
- **Browser**: DevTools → Console

---

## ✅ Checklist

Before going live:

- [ ] Resend API key added to Railway
- [ ] Database migration deployed
- [ ] Test signup flow
- [ ] Test verification email delivery
- [ ] Test verification link
- [ ] Test login with unverified account
- [ ] Test resend verification
- [ ] Check spam folder
- [ ] Verify FRONTEND_URL is correct
- [ ] Test on mobile devices

---

**Status**: ✅ Fully Implemented and Ready to Deploy

**Last Updated**: March 6, 2026
