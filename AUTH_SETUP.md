# 🔐 Authentication Setup Guide

Your dashboard is now protected - only 3 specific Gmail accounts can access it!

## Setup for Vercel (Production)

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Select your project** (data-studio-sheet)

3. **Enable Google+ API:**
   - Go to "APIs & Services" > "Library"
   - Search "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "CREATE CREDENTIALS" > "OAuth client ID"
   - Application type: **Web application**
   - Name: `MSWUxZEKO Dashboard`
   
5. **Add Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-vercel-domain.vercel.app/api/auth/callback/google
   ```
   
   Replace `your-vercel-domain` with your actual Vercel URL!

6. **Click Create**
   - Copy the **Client ID**
   - Copy the **Client Secret**

### Step 2: Update Allowed Emails

Edit `app/api/auth/[...nextauth]/route.ts` and replace these emails with your 3 authorized accounts:

```typescript
const ALLOWED_EMAILS = [
  'your-email1@gmail.com',
  'your-email2@gmail.com',
  'your-email3@gmail.com',
]
```

### Step 3: Add to Your Environment Variables

Update your `vercel-env-import.txt` to include:

```bash
# Google OAuth (for login)
GOOGLE_OAUTH_CLIENT_ID="your-client-id-here"
GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret-here"
NEXTAUTH_SECRET="generate-random-secret-here"
NEXTAUTH_URL="https://your-vercel-domain.vercel.app"
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

### Step 4: Import to Vercel

1. Go to Vercel → Settings → Environment Variables
2. Paste ALL variables (including the new OAuth ones)
3. Redeploy

## Setup for Local Development

Add these to your `.env.local`:

```bash
GOOGLE_OAUTH_CLIENT_ID="your-client-id"
GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

Then restart your dev server:
```bash
npm run dev
```

## How It Works

1. **User visits dashboard** → Redirected to login page
2. **Clicks "Sign in with Google"** → Google OAuth popup
3. **Signs in with Gmail** → System checks if email is in allowed list
4. **If authorized** → Access granted ✅
5. **If not authorized** → Access denied ❌

## Security Features

✅ Only 3 specific Gmail accounts can access
✅ All other accounts blocked automatically
✅ Protected routes: `/` and `/api/sheets`
✅ Session-based authentication
✅ Secure sign out button

## Testing

1. **Try unauthorized email:**
   - Sign in with different Gmail
   - Should see error: "Access Denied"

2. **Try authorized email:**
   - Sign in with allowed Gmail
   - Should see dashboard

## Important Notes

⚠️ **Update Redirect URIs** when you get your Vercel URL
⚠️ **Keep NEXTAUTH_SECRET secure** - never share it
⚠️ **Update ALLOWED_EMAILS** in the code with your 3 real email addresses

## Deployment Checklist

- [ ] Google OAuth credentials created
- [ ] 3 Gmail addresses added to ALLOWED_EMAILS
- [ ] Redirect URIs configured in Google Console
- [ ] OAuth Client ID & Secret added to Vercel
- [ ] NEXTAUTH_SECRET generated and added
- [ ] NEXTAUTH_URL set to your Vercel domain
- [ ] Code pushed to GitHub
- [ ] Vercel redeployed
- [ ] Tested login with authorized account
- [ ] Tested login with unauthorized account

---

Your revenue data is now private and secure! 🔒

