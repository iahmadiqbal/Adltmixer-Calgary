# 🔄 Re-Enable Email Verification Guide

## 📊 Current Status

Email verification is **temporarily disabled** to allow users to signup and login without domain verification on Resend.

### What's Disabled:

- ❌ Email verification requirement on login
- ❌ Verification email sending on signup
- ❌ Token creation in database

### What's Kept:

- ✅ All verification endpoints (`/api/auth/verify-email`, `/api/auth/resend-verification`)
- ✅ All verification pages (`/verify-email`, `/resend-verification`)
- ✅ Email service code
- ✅ Database schema (EmailVerificationToken table)

---

## 🔓 Current Behavior

### Signup Flow:

1. User signs up
2. Account created with `emailVerified: true`
3. No verification email sent
4. User logged in immediately
5. Redirected to `/explore`

### Login Flow:

1. User enters credentials
2. No email verification check
3. Login successful
4. Redirected to `/explore`

---

## 🔐 Re-Enable Verification (After Domain Setup)

### Prerequisites:

1. ✅ Domain verified on Resend
2. ✅ Custom sender email configured (e.g., `noreply@adultmixer.com`)
3. ✅ Tested email sending works

### Step 1: Update Auth Service

**File:** `backend/src/core/modules/auth/auth.service.ts`

#### Change 1: Set emailVerified to false

```typescript
// FIND THIS (around line 35):
emailVerified: true, // Temporarily true - change to false after domain verification

// CHANGE TO:
emailVerified: false,
```

#### Change 2: Uncomment token creation

```typescript
// FIND THIS (around line 50):
// TODO: Uncomment when email verification is re-enabled
// await prisma.emailVerificationToken.create({
//   data: {
//     userId: user.id,
//     token: verificationToken,
//     expiresAt,
//   },
// });

// CHANGE TO:
await prisma.emailVerificationToken.create({
  data: {
    userId: user.id,
    token: verificationToken,
    expiresAt,
  },
});
```

#### Change 3: Uncomment email sending

```typescript
// FIND THIS (around line 60):
// TODO: Re-enable after domain verification on Resend
// EmailService.sendVerificationEmail(
//   user.email,
//   user.firstName,
//   verificationToken,
// ).catch((error) => {
//   console.error("Failed to send verification email:", error);
// });

// CHANGE TO:
EmailService.sendVerificationEmail(
  user.email,
  user.firstName,
  verificationToken,
).catch((error) => {
  console.error("Failed to send verification email:", error);
});
```

#### Change 4: Update success message

```typescript
// FIND THIS (around line 95):
message: "Registration successful! You can now login.", // Temporarily changed

// CHANGE TO:
message: "Registration successful! Please check your email to verify your account.",
```

#### Change 5: Re-enable login check

```typescript
// FIND THIS (around line 115):
// Email verification check temporarily disabled
// TODO: Re-enable after domain verification on Resend
// if (!user.emailVerified) {
//   throw new AppError(
//     "Please verify your email before logging in. Check your inbox for the verification link.",
//     403,
//   );
// }

// CHANGE TO:
if (!user.emailVerified) {
  throw new AppError(
    "Please verify your email before logging in. Check your inbox for the verification link.",
    403,
  );
}
```

---

### Step 2: Update Email Service

**File:** `backend/src/core/services/email.service.ts`

```typescript
// FIND THIS (around line 14):
from: "onboarding@resend.dev",

// CHANGE TO:
from: "noreply@adultmixer.com", // Your verified domain
```

---

### Step 3: Update Frontend Signup

**File:** `src/Pages/SignUp.jsx`

```typescript
// FIND THIS (around line 135):
// Use AuthContext login to update state immediately
login(response.data.user, response.data.token);

toast.success("Welcome to Adultmixer! Let's find your match 💕", {
  duration: 2000,
  position: "top-center",
  icon: "🎉",
  style: {
    background: "#DCFCE7",
    color: "#16A34A",
    fontWeight: "600",
    borderRadius: "12px",
    padding: "16px",
  },
});

setTimeout(() => {
  navigate("/explore");
}, 2000);

// CHANGE TO:
toast.success(
  "Account created! Please check your email to verify your account 📧",
  {
    duration: 5000,
    position: "top-center",
    icon: "✉️",
    style: {
      background: "#DCFCE7",
      color: "#16A34A",
      fontWeight: "600",
      borderRadius: "12px",
      padding: "16px",
    },
  },
);

setTimeout(() => {
  navigate("/login");
}, 3000);
```

---

### Step 4: Update Frontend Login

**File:** `src/Pages/Login.jsx`

```typescript
// FIND THIS (around line 285):
const message = err.response?.data?.message || "Invalid email or password";

setError(message);
toast.error(message);

// CHANGE TO:
const message = err.response?.data?.message || "Invalid email or password";
const statusCode = err.response?.status;

setError(message);

// Special handling for unverified email (403)
if (statusCode === 403) {
  toast.error(message, {
    duration: 5000,
    icon: "📧",
  });

  // Show option to resend verification
  setTimeout(() => {
    const shouldResend = window.confirm(
      "Would you like to resend the verification email?",
    );
    if (shouldResend) {
      navigate("/resend-verification");
    }
  }, 2000);
} else {
  toast.error(message);
}
```

---

### Step 5: Deploy

```bash
# Commit changes
git add .
git commit -m "feat: Re-enable email verification with custom domain"
git push origin main

# Railway and Vercel will auto-deploy
```

---

## 🧪 Testing After Re-enabling

### Test 1: Signup Flow

1. Sign up with new email
2. Should see: "Please check your email..."
3. Check inbox for verification email
4. Click verification link
5. Should see: "Email verified successfully!"

### Test 2: Login Without Verification

1. Try to login before verifying
2. Should see: "Please verify your email..."
3. Should offer to resend verification

### Test 3: Login After Verification

1. Verify email first
2. Then login
3. Should work successfully

### Test 4: Resend Verification

1. Go to `/resend-verification`
2. Enter email
3. Should receive new verification email
4. Click link
5. Should verify successfully

---

## 📋 Checklist

Before re-enabling:

- [ ] Domain verified on Resend
- [ ] Custom sender email configured
- [ ] Test email sending works
- [ ] Update all 5 files above
- [ ] Commit and push changes
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test verification flow
- [ ] Test resend verification

---

## 🔄 Quick Summary

**Files to Update:**

1. `backend/src/core/modules/auth/auth.service.ts` (5 changes)
2. `backend/src/core/services/email.service.ts` (1 change)
3. `src/Pages/SignUp.jsx` (1 change)
4. `src/Pages/Login.jsx` (1 change)

**Total Changes:** 8 locations

**Time Required:** 10-15 minutes

---

## 🆘 If Issues After Re-enabling

### Users Can't Login

- Check Railway logs for errors
- Verify email sending works
- Check Resend dashboard for delivery

### Emails Not Arriving

- Check spam folder
- Verify domain is active on Resend
- Check sender email is correct
- Review Resend logs

### Verification Link Broken

- Check `FRONTEND_URL` in Railway
- Verify token is in database
- Check token hasn't expired (24 hours)

---

**Status:** ✅ Ready to re-enable when domain is verified

**Current Mode:** Verification disabled, all users auto-verified

**Future Mode:** Full email verification with custom domain
