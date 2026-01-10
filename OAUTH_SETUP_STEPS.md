# 🚀 OAuth Setup - Follow These Exact Steps

## Error 401: invalid_client - This is NORMAL!
You just need to configure OAuth. Follow these steps:

---

## STEP 1: Create OAuth Client (5 minutes)

### 1.1 Go to Google Cloud Console
**URL:** https://console.cloud.google.com/apis/credentials?project=data-studio-sheet

### 1.2 Configure Consent Screen (FIRST TIME ONLY)
- Look for "OAuth consent screen" in left menu
- If not configured, click it:
  - User Type: **External**
  - Click **CREATE**
  - App name: `MSWUxZEKO Dashboard`
  - User support email: Pick your email
  - Developer email: Your email
  - Click **SAVE AND CONTINUE**
  - Skip "Scopes" - Click **SAVE AND CONTINUE**
  - Skip "Test users" - Click **SAVE AND CONTINUE**
  - Click **BACK TO DASHBOARD**

### 1.3 Create OAuth Client
- Go back to "Credentials" page
- Click **+ CREATE CREDENTIALS** at top
- Select **OAuth client ID**
- Application type: **Web application**
- Name: `MSWUxZEKO Local`

### 1.4 Add Authorized Redirect URIs
Add this EXACT URL:
```
http://localhost:3000/api/auth/callback/google
```

Click **CREATE**

### 1.5 Copy Credentials
A popup appears with:
- **Client ID** (looks like: xxxxx.apps.googleusercontent.com)
- **Client secret** (looks like: GOCSPX-xxxxx)

**COPY BOTH!** You'll need them in the next step.

---

## STEP 2: Add to .env.local

### 2.1 Generate a Secret
Run this command in terminal:
```bash
openssl rand -base64 32
```
Copy the output.

### 2.2 Create/Update .env.local File
In your project root, create or update `.env.local` with:

```bash
# Google Sheets
GOOGLE_SHEET_ID=1iZN_DNgUQ_ftuVOxf6ylKxTzfRFnyLLZKAsagUll_XA
GOOGLE_SHEET_RANGE=Test_data!A2:Z

# OAuth (paste your values here)
GOOGLE_OAUTH_CLIENT_ID=paste-client-id-from-step-1.5
GOOGLE_OAUTH_CLIENT_SECRET=paste-client-secret-from-step-1.5
NEXTAUTH_SECRET=paste-generated-secret-from-step-2.1
NEXTAUTH_URL=http://localhost:3000
```

Save the file.

---

## STEP 3: Restart Server

The server should auto-restart when you save .env.local

If not, manually restart:
```bash
# Stop current server (Ctrl+C in terminal)
npm run dev
```

---

## STEP 4: Test Login

1. Go to: http://localhost:3000
2. Click **"Sign in with Google"**
3. Choose one of the 3 authorized accounts:
   - musa@choixmedia.com
   - musaefendi@gmail.com
   - zakariyya.z@antetechnologies.com

**It should work!** ✅

---

## For Vercel (After Local Works)

1. Create another OAuth client for production (or add redirect URI to existing)
2. Add redirect URI: `https://your-vercel-url.vercel.app/api/auth/callback/google`
3. Update `vercel-env-import.txt` with the OAuth values
4. Import to Vercel
5. Redeploy

---

## Troubleshooting

**Still getting 401 error?**
- Make sure you copied Client ID and Secret correctly
- Make sure redirect URI is EXACTLY: `http://localhost:3000/api/auth/callback/google`
- Restart the dev server after editing .env.local

**Different error?**
- Share the error message and I'll help!

