# Quick Start - 3 Simple Steps

## Step 1: Add your keys.json file

**Place your `keys.json` file in the root folder** (same folder as package.json):

```
MSWU dashboard/
├── keys.json          ← PUT YOUR FILE HERE
├── package.json
├── app/
├── components/
└── ...
```

Your `keys.json` should look like this:
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "...@....iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

## Step 2: Share Your Google Sheet

1. Open your Google Sheet
2. Click the **Share** button (top right)
3. Copy the `client_email` from your `keys.json` file
4. Paste it in the share dialog
5. Give it **Viewer** access
6. Click **Send**

## Step 3: Configure Your Sheet ID

Create a file named `.env.local` in the root folder:

```bash
GOOGLE_SHEET_ID=your-sheet-id-here
GOOGLE_SHEET_RANGE=Sheet1!A2:N
```

**How to find your Sheet ID:**

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                        ↑ This part is your Sheet ID
```

Copy that ID and paste it in `.env.local`.

---

## That's it! Now run:

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Sheet Structure

Make sure your Google Sheet has these columns in order (Row 1 = headers, data starts Row 2):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Date | Campaign ID | Traffic | Revenue | Expense | GP | GP% | ROI | Visits | Registrations | FTD | QP | Traffic | Avg. CPC |

---

## Troubleshooting

**"Failed to fetch data"**
- Did you share the sheet with the `client_email` from keys.json?
- Is your GOOGLE_SHEET_ID correct?
- Is keys.json in the root folder?

**"No data showing"**
- Check that data starts from row 2 (row 1 is headers)
- Verify the sheet name in GOOGLE_SHEET_RANGE matches your actual sheet name

