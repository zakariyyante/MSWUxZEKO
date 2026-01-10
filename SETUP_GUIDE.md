# Quick Setup Guide

## Step 1: Install Dependencies

Run this command in your terminal:

```bash
npm install
```

## Step 2: Set Up Google Sheets API

### Create Service Account (5 minutes):

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create/Select Project**: Click the project dropdown and create a new project
3. **Enable Google Sheets API**:
   - Click "APIs & Services" > "Library"
   - Search "Google Sheets API"
   - Click "Enable"
4. **Create Service Account**:
   - Go to "APIs & Services" > "Credentials"
   - Click "CREATE CREDENTIALS" > "Service Account"
   - Name it (e.g., "dashboard-reader")
   - Click "CREATE AND CONTINUE"
   - Skip optional steps, click "DONE"
5. **Download Key**:
   - Click on the service account you created
   - Go to "KEYS" tab
   - Click "ADD KEY" > "Create new key"
   - Choose "JSON"
   - Save the downloaded file

### Share Your Google Sheet:

1. Open your Google Sheet
2. Click the "Share" button (top right)
3. Paste the `client_email` from your downloaded JSON file
   - It looks like: `something@project-id.iam.gserviceaccount.com`
4. Give it "Viewer" permission
5. Click "Send"

### Prepare Your Google Sheet:

Your sheet should have these columns in order (Row 1 = Headers):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Date | Campaign ID | Traffic | Revenue | Expense | GP | GP% | ROI | Visits | Registrations | FTD | QP | Traffic | Avg. CPC |

Example data row:
```
2026-01-09 | UK04VG | Google | 17920 | 0 | 6959 | 61.1% | 157.5% | 46 | 46 | 28 | 29 | 278 | 25.03
```

## Step 3: Configure Environment Variables

1. **Copy the example file**:
   ```bash
   cp env.example.txt .env.local
   ```

2. **Edit `.env.local`** with your values:
   - Open the JSON key file you downloaded
   - Copy the values:

```bash
GOOGLE_CLIENT_EMAIL=paste-client-email-here
GOOGLE_PRIVATE_KEY="paste-entire-private-key-here-with-quotes"
GOOGLE_SHEET_ID=your-sheet-id-from-url
GOOGLE_SHEET_RANGE=Sheet1!A2:N
```

**Finding your Sheet ID:**
Your Google Sheet URL looks like:
```
https://docs.google.com/spreadsheets/d/1ABC...XYZ/edit
                                        ↑ This is your Sheet ID
```

## Step 4: Run the Dashboard

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

## Troubleshooting

### Error: "Failed to fetch data"
- Check that you shared the sheet with the service account email
- Verify your GOOGLE_SHEET_ID is correct
- Make sure the sheet range matches your data (e.g., Sheet1!A2:N)

### Error: "Invalid private key"
- Make sure the private key includes quotes around it in .env.local
- Ensure line breaks are preserved as `\n`

### No data showing
- Check that row 1 has headers
- Data should start from row 2
- Verify column order matches the expected structure

## Features

✅ Real-time data from Google Sheets  
✅ Auto-refresh every 5 minutes  
✅ Filter by Date Range  
✅ Filter by Campaign ID  
✅ Filter by Traffic Source  
✅ Modern, responsive UI  
✅ Color-coded profit/loss indicators

## Next Steps

- Customize refresh interval in `components/Dashboard.tsx`
- Adjust column mapping in `lib/googleSheets.ts`
- Deploy to Vercel for production use

