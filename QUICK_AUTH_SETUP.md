# 🔐 Quick Authentication Setup

## What Changed?

Your dashboard now requires login! Only 3 specific Gmail accounts can access it.

## To Add Your 3 Authorized Emails:

**Edit this file:** `app/api/auth/[...nextauth]/route.ts`

Find this section (around line 5-9):
```typescript
const ALLOWED_EMAILS = [
  'your-email1@gmail.com',
  'your-email2@gmail.com',
  'your-email3@gmail.com',
]
```

**Replace with your 3 real Gmail addresses!**

## Quick Setup (3 Steps):

### 1. Create Google OAuth App
- Go to: https://console.cloud.google.com/apis/credentials
- CREATE CREDENTIALS → OAuth client ID
- Type: **Web application**
- Authorized redirect URIs:
  ```
  http://localhost:3000/api/auth/callback/google
  https://YOUR-VERCEL-URL.vercel.app/api/auth/callback/google
  ```
- Copy **Client ID** and **Client Secret**

### 2. Generate Secret Key
Run this command:
```bash
openssl rand -base64 32
```
Copy the result.

### 3. Add to Vercel Environment Variables

Go to Vercel → Settings → Environment Variables → Import/Add:

```bash
GOOGLE_OAUTH_CLIENT_ID="your-client-id-from-step-1"
GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret-from-step-1"
NEXTAUTH_SECRET="your-generated-secret-from-step-2"
NEXTAUTH_URL="https://your-vercel-url.vercel.app"
```

Then **Redeploy**!

## For Local Testing

Add to `.env.local`:
```bash
GOOGLE_OAUTH_CLIENT_ID="your-client-id"
GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

Restart server: `npm run dev`

## How It Works

- ✅ Anyone tries to access → Redirected to login page
- ✅ Must sign in with Google
- ✅ Only the 3 emails you specified can access
- ✅ All others get "Access Denied"

## Result

🔒 Your revenue data is now PRIVATE and SECURE!

See `AUTH_SETUP.md` for detailed instructions.

