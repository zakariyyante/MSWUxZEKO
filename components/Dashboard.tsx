'use client'

import { useState, useEffect } from 'react'
import DataTable from './DataTable'
import Filters from './Filters'
import PerformanceChart from './PerformanceChart'

export interface DashboardData {
  date: string
  code: string
  brand: string
  visits: number
  registrations: number
  ftd: number
  qp: number
  revenue: number
  expense: number
  profit: number
  roi: number
}

// Country code mapping
const COUNTRY_CODES: Record<string, string[]> = {
  'NL': ['CXNL01', 'CXNL05'],
  'FR': ['CXFR11'],
  'SE': ['CXSE01'],
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData[]>([])
  const [rawData, setRawData] = useState<DashboardData[]>([])
  const [filteredData, setFilteredData] = useState<DashboardData[]>([])
  const [filteredRawData, setFilteredRawData] = useState<DashboardData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['NL', 'FR', 'SE'])

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/sheets')
      const result = await response.json()
      
      if (result.tableData && result.rawData) {
        setData(result.tableData)
        setRawData(result.rawData)
        // Apply initial filter with all countries selected
        applyFilters(result.tableData, result.rawData, ['NL', 'FR', 'SE'], '', '', '')
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchData()
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Apply filters helper function
  const applyFilters = (
    sourceData: DashboardData[], 
    sourceRawData: DashboardData[],
    countries: string[],
    dateStart: string,
    dateEnd: string,
    codeSearch: string
  ) => {
    let filtered = [...sourceData]
    let filteredRaw = [...sourceRawData]

    // Get allowed codes based on selected countries
    const allowedCodes: string[] = []
    countries.forEach(country => {
      if (COUNTRY_CODES[country]) {
        allowedCodes.push(...COUNTRY_CODES[country])
      }
    })

    // Filter by country codes
    if (allowedCodes.length > 0) {
      filtered = filtered.filter(item => allowedCodes.includes(item.code))
      filteredRaw = filteredRaw.filter(item => allowedCodes.includes(item.code))
    }

    // Filter by date range
    if (dateStart) {
      filtered = filtered.filter(item => item.date >= dateStart)
      filteredRaw = filteredRaw.filter(item => item.date >= dateStart)
    }
    if (dateEnd) {
      filtered = filtered.filter(item => item.date <= dateEnd)
      filteredRaw = filteredRaw.filter(item => item.date <= dateEnd)
    }

    // Filter by code search
    if (codeSearch) {
      filtered = filtered.filter(item => 
        item.code.toLowerCase().includes(codeSearch.toLowerCase())
      )
      filteredRaw = filteredRaw.filter(item => 
        item.code.toLowerCase().includes(codeSearch.toLowerCase())
      )
    }

    setFilteredData(filtered)
    setFilteredRawData(filteredRaw)
  }

  const handleFilter = (filters: {
    dateRange: { start: string; end: string }
    code: string
    countries: string[]
  }) => {
    // Save selected countries for flag display
    setSelectedCountries(filters.countries)

    // Apply filters using the helper function
    applyFilters(
      data,
      rawData,
      filters.countries,
      filters.dateRange.start,
      filters.dateRange.end,
      filters.code
    )
  }

  // Determine which flag to show
  const getCountryFlag = () => {
    if (selectedCountries.length === 1) {
      switch (selectedCountries[0]) {
        case 'NL': return '🇳🇱'
        case 'FR': return '🇫🇷'
        case 'SE': return '🇸🇪'
      }
    }
    return null
  }

  const countryFlag = getCountryFlag()

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div className="flex items-center gap-2 md:gap-3">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">Filters</h2>
            {countryFlag && (
              <span className="text-2xl md:text-3xl" title={selectedCountries[0]}>{countryFlag}</span>
            )}
          </div>
          {lastUpdated && (
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
        <Filters onFilter={handleFilter} />
      </div>

      {!loading && filteredRawData.length > 0 && (
        <PerformanceChart data={filteredRawData} />
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <DataTable data={filteredData} />
        )}
      </div>
    </div>
  )
}

