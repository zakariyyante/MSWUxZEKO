# 🚀 Detailed Vercel Setup Guide

## Why Vercel Needs Special Setup

**Local (your computer):**
- ✅ Has `keys.json` file
- ✅ Works at http://localhost:3000

**Vercel (cloud):**
- ❌ No `keys.json` (for security, we don't push it to GitHub)
- ✅ Uses Environment Variables instead

## Step-by-Step: Add Environment Variables to Vercel

### 1. Go to Your Vercel Project
- Visit: https://vercel.com/dashboard
- Click on your **MSWUxZEKO** project

### 2. Go to Settings → Environment Variables
- Click **Settings** tab
- Click **Environment Variables** in left sidebar

### 3. Add These 4 Variables

#### Variable 1: GOOGLE_SHEET_ID
```
Name: GOOGLE_SHEET_ID
Value: 1iZN_DNgUQ_ftuVOxf6ylKxTzfRFnyLLZKAsagUll_XA
Environment: Production, Preview, Development
```

#### Variable 2: GOOGLE_SHEET_RANGE
```
Name: GOOGLE_SHEET_RANGE
Value: Test_data!A2:Z
Environment: Production, Preview, Development
```

#### Variable 3: GOOGLE_CLIENT_EMAIL
```
Name: GOOGLE_CLIENT_EMAIL
Value: data-import@data-studio-sheet.iam.gserviceaccount.com
Environment: Production, Preview, Development
```

#### Variable 4: GOOGLE_PRIVATE_KEY ⚠️ IMPORTANT!

**Open your local `keys.json` file and copy the ENTIRE `private_key` value**

```
Name: GOOGLE_PRIVATE_KEY
Value: -----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/yFdLMXUu1laJ
TQfMrCw0uRIntxO/P9o55XQPRaBFaWF7qn9r8uG72HUaeZ3ovQcmnVzgsLBnZCFe
...
(YOUR FULL KEY HERE - keep all the line breaks!)
...
-----END PRIVATE KEY-----

Environment: Production, Preview, Development
```

**⚠️ CRITICAL for GOOGLE_PRIVATE_KEY:**
- Copy the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep all line breaks as they are
- DON'T add extra quotes
- It should be multiple lines, not one long line

### 4. Redeploy

After adding all variables:
- Go to **Deployments** tab
- Click **⋮** (three dots) on latest deployment
- Click **Redeploy**
- Wait for build to complete

## 🔍 Troubleshooting

### Check if Variables are Set

In Vercel:
1. Go to your deployment
2. Click **View Function Logs**
3. Look for: `"Using environment variables for Google Auth"`

If you see: `"Using keys.json for Google Auth"` → Environment variables NOT working

### Common Issues

#### Issue 1: "Failed to fetch data"
**Cause:** Environment variables not set or incorrect

**Fix:**
1. Check all 4 variables are in Vercel
2. Verify no typos in variable names
3. Make sure GOOGLE_PRIVATE_KEY has line breaks

#### Issue 2: "Invalid credentials"
**Cause:** GOOGLE_PRIVATE_KEY formatted wrong

**Fix:**
- Copy key EXACTLY from keys.json
- It should look like multiple lines, not one line
- Include BEGIN and END markers

#### Issue 3: "No data showing"
**Cause:** Sheet not shared with service account

**Fix:**
- Open your Google Sheet
- Click Share
- Add: `data-import@data-studio-sheet.iam.gserviceaccount.com`
- Give "Viewer" permission

## ✅ Verification Steps

1. **Check Vercel logs:**
   - Should see: `"Using environment variables for Google Auth"`

2. **Test the deployment:**
   - Open your Vercel URL
   - Data should load within a few seconds

3. **Check browser console (F12):**
   - Should see no errors
   - Data should appear in table

## 📋 Quick Checklist

Before redeploying, verify:
- [ ] All 4 environment variables added to Vercel
- [ ] GOOGLE_PRIVATE_KEY has proper line breaks
- [ ] Google Sheet shared with service account email
- [ ] Variables set for Production, Preview, Development
- [ ] Redeployed after adding variables

## 🎯 Expected Result

After correct setup:
- ✅ Dashboard loads on Vercel
- ✅ Data appears from Google Sheets
- ✅ Filters work
- ✅ Chart shows brands
- ✅ Auto-refresh every 5 minutes

## 🆘 Still Not Working?

Check these logs in Vercel:
1. Go to deployment
2. Click **View Function Logs**
3. Look for error messages
4. Share the error with me if stuck!

---

**Remember:** Vercel is a cloud server, it can't access your local files. It NEEDS environment variables to connect to Google Sheets!

