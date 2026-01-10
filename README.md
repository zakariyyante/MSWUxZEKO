# MSWUxZEKO Dashboard

A modern, real-time marketing dashboard that pulls data from Google Sheets with country-based filtering and brand performance analytics.

## Features

- 📊 Real-time data from Google Sheets (auto-refresh every 5 minutes)
- 🌍 Country-based filtering (Netherlands, France, Sweden)
- 📈 Top 15 brands performance chart by FTD
- 🔍 Advanced filtering (Date range, Campaign codes)
- 💰 Automatic profit & ROI calculations
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive mobile design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Source:** Google Sheets API
- **Deployment:** Vercel

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEET_RANGE=Test_data!A2:Z
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add Google Sheets credentials:**
   - Place your `keys.json` file in the root directory
   - Share your Google Sheet with the service account email from `keys.json`

3. **Configure environment:**
   - Copy your Google Sheet ID to `.env.local`
   - Set the appropriate sheet range

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open:** http://localhost:3000

## Google Sheets Structure

### Test_data Sheet (Main Data)
- Column A: Index
- Column B: Date
- Column D: Code
- Column H: Revenue
- Column M: Signup
- Column N: FTD
- Column O: Qualified FTD
- Column U: Brand

### Manual Sheet (Expenses)
- Column A: Date
- Column B: Code
- Column G: Expense

## Deployment

### Vercel Deployment

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Import project in Vercel dashboard

3. Add environment variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_RANGE`
   - `GOOGLE_CLIENT_EMAIL` (from keys.json)
   - `GOOGLE_PRIVATE_KEY` (from keys.json)

4. Deploy!

## Country Code Mapping

- 🇳🇱 Netherlands: CXNL01, CXNL05
- 🇫🇷 France: CXFR11
- 🇸🇪 Sweden: CXSE01

## License

MIT
