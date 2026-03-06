# ⚡ Email Verification - Quick Start

## ✅ What's Done

Email verification is fully implemented! Users must verify their email before logging in.

---

## 🚀 Setup (5 Minutes)

### Step 1: Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign up
2. Go to **API Keys** → **Create API Key**
3. Copy the key (starts with `re_`)

### Step 2: Add to Railway

1. Railway dashboard → Your backend project
2. **Variables** tab → **New Variable**
3. Add:
   ```
   RESEND_API_KEY = re_your_api_key_here
   ```
4. Save (Railway will auto-redeploy)

### Step 3: Run Migration in Production

Railway will automatically run migrations on deploy, but if needed:

```bash
# In Railway dashboard → Settings → Deploy
# Or manually trigger redeploy
```

### Step 4: Test!

1. Go to your Vercel site
2. Sign up with a real email
3. Check inbox for verification email
4. Click the link
5. Login!

---

## 📧 How It Works

### User Signs Up

- Account created with `emailVerified: false`
- Verification email sent automatically
- User redirected to login page

### User Clicks Email Link

- Goes to `/verify-email?token=xxx`
- Email verified automatically
- Redirected to login

### User Tries to Login (Unverified)

- Gets 403 error
- Message: "Please verify your email..."
- Option to resend verification email

---

## 🎯 New Pages

1. **`/verify-email`** - Email verification page
2. **`/resend-verification`** - Resend verification email

---

## 🔧 New API Endpoints

1. **GET `/api/auth/verify-email?token=xxx`** - Verify email
2. **POST `/api/auth/resend-verification`** - Resend email

---

## ⚠️ Important Notes

### Email Sender

With free Resend, you can only use:

```
onboarding@resend.dev
```

For custom domain (e.g., `noreply@adultmixer.com`), you need:

- Paid Resend plan
- Domain verification

### Email Delivery

- Check spam folder if not received
- Resend logs: [resend.com/logs](https://resend.com/logs)
- Token expires in 24 hours

### Testing

**Local Testing:**

- Use real email addresses
- Check your actual inbox

**Production Testing:**

- Sign up on live site
- Verify email works end-to-end

---

## 🐛 Troubleshooting

### "Email not received"

- Check spam folder
- Check Resend logs
- Use `/resend-verification` page

### "Token expired"

- Request new verification email
- Go to `/resend-verification`

### "Can't login"

- Make sure email is verified
- Check for 403 error message
- Resend verification if needed

---

## 📋 Deployment Checklist

- [x] Code pushed to GitHub
- [ ] Resend API key added to Railway
- [ ] Railway redeployed
- [ ] Test signup flow
- [ ] Test email delivery
- [ ] Test verification link
- [ ] Test login with unverified account

---

## 📚 Full Documentation

See `EMAIL_VERIFICATION_SETUP.md` for complete details.

---

**Status**: ✅ Ready to Deploy

**Next Step**: Add `RESEND_API_KEY` to Railway!
