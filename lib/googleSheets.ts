import { google } from 'googleapis'
import path from 'path'
import fs from 'fs'

// Helper function to normalize dates to YYYY-MM-DD format
function normalizeDate(dateStr: string): string {
  if (!dateStr) return ''
  
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  } catch (e) {
    return dateStr
  }
}

export async function getSheetData() {
  try {
    let auth;

    // Priority 1: Use environment variables (for Vercel/production)
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Using environment variables for Google Auth')
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      })
    } 
    // Priority 2: Use keys.json file (for local development)
    else {
      const keysPath = path.join(process.cwd(), 'keys.json')
      if (fs.existsSync(keysPath)) {
        console.log('Using keys.json for Google Auth')
        auth = new google.auth.GoogleAuth({
          keyFile: keysPath,
          scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        })
      } else {
        throw new Error('No Google credentials found. Set environment variables or add keys.json')
      }
    }

    const sheets = google.sheets({ version: 'v4', auth })
    
    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is not configured')
    }

    // Fetch both sheets in parallel
    const [testDataResponse, manualDataResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Test_data!A2:Z',
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Manual!A2:G',
      }),
    ])

    const rows = testDataResponse.data.values
    const expenseRows = manualDataResponse.data.values

    if (!rows || rows.length === 0) {
      return []
    }

    // Transform rows into structured data - only needed columns
    // Correct column mapping:
    // B=Date (index 1), D=Code (index 3), M=Signup (index 12), 
    // N=FTD (index 13), O=Qualified FTD (index 14), H=Revenue (index 7)
    
    // Filter criteria
    const allowedCodes = ['CXNL01', 'CXNL05', 'CXSE01']
    const startDate = new Date('2025-11-01') // November 1st, 2025
    
    const rawData = rows
      .map((row) => {
        const rawDate = row[1] || ''
        return {
          date: normalizeDate(rawDate),            // Column B - Date (normalized)
          code: row[3] || '',                      // Column D - Code
          brand: row[20] || '',                    // Column U - Brand
          visits: 0,                               // Not available in sheet
          registrations: parseInt(row[12]) || 0,   // Column M - Signup
          ftd: parseInt(row[13]) || 0,             // Column N - FTD
          qp: parseInt(row[14]) || 0,              // Column O - Qualified FTD
          revenue: parseFloat(row[7]) || 0,        // Column H - Revenue
        }
      })
      .filter((row) => {
        // Filter by allowed campaign codes
        if (!allowedCodes.includes(row.code)) {
          return false
        }
        
        // Filter by date (from November 1st, 2025 onwards - inclusive)
        const rowDate = new Date(row.date)
        // Normalize both dates to midnight for proper comparison
        const normalizedRowDate = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate())
        const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        
        if (isNaN(normalizedRowDate.getTime()) || normalizedRowDate < normalizedStartDate) {
          return false
        }
        
        return true
      })

    // Group by CODE and DATE, summing up all metrics
    const groupedData = new Map<string, any>()
    
    rawData.forEach((row) => {
      const key = `${row.code}|${row.date}` // Create unique key combining code and date
      
      if (groupedData.has(key)) {
        // Aggregate existing entry
        const existing = groupedData.get(key)
        existing.registrations += row.registrations
        existing.ftd += row.ftd
        existing.qp += row.qp
        existing.revenue += row.revenue
        // Keep the first brand value found
        if (!existing.brand && row.brand) {
          existing.brand = row.brand
        }
      } else {
        // Create new entry
        groupedData.set(key, {
          date: row.date,
          code: row.code,
          brand: row.brand,
          visits: row.visits,
          registrations: row.registrations,
          ftd: row.ftd,
          qp: row.qp,
          revenue: row.revenue,
        })
      }
    })

    // Convert map back to array
    let data = Array.from(groupedData.values())
    
    // Process expense data from Manual sheet
    // Columns: A=Date (index 0), B=Code (index 1), G=Expense (index 6)
    const expenseMap = new Map<string, number>()
    
    if (expenseRows && expenseRows.length > 0) {
      expenseRows.forEach((row) => {
        const rawDate = row[0] || ''
        const date = normalizeDate(rawDate)        // Normalize date format
        const code = row[1] || ''
        const expense = parseFloat(row[6]) || 0
        
        const key = `${code}|${date}`
        
        // Sum expenses if there are multiple rows for same code+date
        if (expenseMap.has(key)) {
          expenseMap.set(key, expenseMap.get(key)! + expense)
        } else {
          expenseMap.set(key, expense)
        }
      })
    }
    
    // LEFT JOIN: Add expense to each data row and calculate Profit & ROI
    data = data.map((row) => {
      const key = `${row.code}|${row.date}`
      const expense = expenseMap.get(key) || 0
      const profit = row.revenue - expense
      const roi = expense > 0 ? (profit / expense) * 100 : 0
      
      return {
        ...row,
        expense,
        profit,
        roi,
      }
    })
    
    // Sort by date and code
    data.sort((a, b) => {
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date)
      }
      return a.code.localeCompare(b.code)
    })

    // Return both grouped data (for table) and raw data (for brand analysis)
    return {
      tableData: data,
      rawData: rawData, // Keep ungrouped data for brand chart
    }
  } catch (error) {
    console.error('Error reading Google Sheet:', error)
    throw error
  }
}
