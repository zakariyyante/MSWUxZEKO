'use client'

import { useState } from 'react'

interface FiltersProps {
  onFilter: (filters: {
    dateRange: { start: string; end: string }
    code: string
    countries: string[]
  }) => void
}

export default function Filters({ onFilter }: FiltersProps) {
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [code, setCode] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['NL', 'FR', 'SE'])

  const handleCountryToggle = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country))
    } else {
      setSelectedCountries([...selectedCountries, country])
    }
  }

  const handleApplyFilters = () => {
    onFilter({
      dateRange: { start: dateStart, end: dateEnd },
      code,
      countries: selectedCountries,
    })
  }

  const handleReset = () => {
    setDateStart('')
    setDateEnd('')
    setCode('')
    setSelectedCountries(['NL', 'FR', 'SE'])
    onFilter({
      dateRange: { start: '', end: '' },
      code: '',
      countries: ['NL', 'FR', 'SE'],
    })
  }

  return (
    <div className="space-y-4">
      {/* Country checkboxes */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Countries
        </label>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCountries.includes('NL')}
              onChange={() => handleCountryToggle('NL')}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">🇳🇱 Netherlands</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCountries.includes('FR')}
              onChange={() => handleCountryToggle('FR')}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">🇫🇷 France</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCountries.includes('SE')}
              onChange={() => handleCountryToggle('SE')}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">🇸🇪 Sweden</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Search..."
            className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-1">
          <button
            onClick={handleApplyFilters}
            className="flex-1 bg-blue-600 text-white px-3 sm:px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 sm:px-4 py-2 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

