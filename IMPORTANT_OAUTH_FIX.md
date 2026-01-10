# ⚠️ IMPORTANT: Update OAuth Redirect URI

## Problem:
Your OAuth app has the wrong redirect URI configured. It shows:
```
redirect_uris: ["https://www.mswuxzeko.com/"]
```

But it needs:
```
http://localhost:3000/api/auth/callback/google
```

## Fix This Now:

1. **Go to:** https://console.cloud.google.com/apis/credentials?project=verdant-art-379206

2. **Click on your OAuth client:** "musaxzeko" (or the one you just created)

3. **Under "Authorized redirect URIs":**
   - Click **"+ ADD URI"**
   - Add: `http://localhost:3000/api/auth/callback/google`
   - Keep the existing: `https://www.mswuxzeko.com/` (if needed)
   - Or add your Vercel URL: `https://your-vercel-url.vercel.app/api/auth/callback/google`

4. **Click SAVE** at the bottom

5. **Wait 1-2 minutes** for changes to take effect

6. **Try signing in again** at http://localhost:3000

---

## The redirect URI MUST be EXACT:

❌ Wrong: `https://www.mswuxzeko.com/`
✅ Correct: `http://localhost:3000/api/auth/callback/google`

The URI must include `/api/auth/callback/google` at the end!

---

Once you update this, the login will work! 🔐

