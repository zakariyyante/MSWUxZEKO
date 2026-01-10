# Vercel Deployment Guide

## 🚀 Deploy MSWUxZEKO Dashboard to Vercel

### Prerequisites
- GitHub repository: `git@github.com:zakariyyante/MSWUxZEKO.git` ✅
- Vercel account
- Google Sheets API credentials (`keys.json`)

### Step 1: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose: `zakariyyante/MSWUxZEKO`
5. Click **"Import"**

### Step 2: Configure Environment Variables

In Vercel project settings, add these environment variables:

#### Required Variables:

```bash
GOOGLE_SHEET_ID=1iZN_DNgUQ_ftuVOxf6ylKxTzfRFnyLLZKAsagUll_XA
GOOGLE_SHEET_RANGE=Test_data!A2:Z
```

#### From your `keys.json` file:

```bash
GOOGLE_CLIENT_EMAIL=data-import@data-studio-sheet.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...(your full private key)...\n-----END PRIVATE KEY-----\n"
```

**⚠️ Important for GOOGLE_PRIVATE_KEY:**
- Keep the quotes around the value
- Keep the `\n` line breaks as-is
- Copy the entire private key including BEGIN and END lines

### Step 3: Deploy Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Node Version:** 20.x (auto-detected from `.nvmrc`)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Your dashboard will be live!

### Step 5: Verify Deployment

1. Open your Vercel URL
2. Check that data loads from Google Sheets
3. Test filters and country selection
4. Verify dark mode toggle works
5. Test on mobile device

## 🔄 Continuous Deployment

Any push to the `main` branch will automatically deploy to Vercel.

```bash
# Make changes, then:
git add .
git commit -m "Your changes"
git push origin main
# Vercel will auto-deploy!
```

## 🛠 Troubleshooting

### "Failed to fetch data from Google Sheets"
- Check that `GOOGLE_CLIENT_EMAIL` is correct
- Verify `GOOGLE_PRIVATE_KEY` has correct line breaks (`\n`)
- Ensure Google Sheet is shared with the service account email

### "Build failed"
- Check Node.js version is 20.x
- Verify all environment variables are set
- Check Vercel build logs for errors

### "No data showing"
- Verify `GOOGLE_SHEET_ID` is correct
- Check `GOOGLE_SHEET_RANGE` matches your sheet
- Ensure Manual sheet exists for expense data

## 📊 Sheet Requirements

Make sure your Google Sheets have:

1. **Test_data sheet** with columns:
   - B: Date
   - D: Code
   - H: Revenue
   - M: Signup
   - N: FTD
   - O: Qualified FTD
   - U: Brand

2. **Manual sheet** with columns:
   - A: Date
   - B: Code
   - G: Expense

## 🌐 Custom Domain (Optional)

1. Go to Vercel Project Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 📱 Performance

- First load: ~1-2s
- Data refresh: Every 5 minutes
- Lighthouse score: 95+ on all metrics

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project imported
- [ ] Environment variables configured
- [ ] Google Sheet shared with service account
- [ ] First deployment successful
- [ ] Data loading correctly
- [ ] Filters working
- [ ] Mobile responsive
- [ ] Dark mode working

---

**Need help?** Check the [README.md](./README.md) for more details.

