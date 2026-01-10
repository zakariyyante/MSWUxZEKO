import { NextResponse } from 'next/server'
import { getSheetData } from '@/lib/googleSheets'

export async function GET() {
  try {
    const result = await getSheetData()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    )
  }
}

// Enable revalidation every 60 seconds
export const revalidate = 60

