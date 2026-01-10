'use client'

import { DashboardData } from './Dashboard'
import { useMemo, useState } from 'react'

interface PerformanceChartProps {
  data: DashboardData[]
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  // Aggregate data by brand (top 15 by FTD)
  const chartData = useMemo(() => {
    const aggregated = new Map<string, {
      brand: string
      ftd: number
      revenue: number
    }>()

    // Group by brand and sum FTDs and Revenue
    data.forEach((row) => {
      const brand = row.brand || 'Unknown'
      
      if (!brand || brand === 'Unknown' || brand.trim() === '') {
        return // Skip rows without brand
      }
      
      if (aggregated.has(brand)) {
        const existing = aggregated.get(brand)!
        existing.ftd += row.ftd
        existing.revenue += row.revenue
      } else {
        aggregated.set(brand, {
          brand,
          ftd: row.ftd,
          revenue: row.revenue,
        })
      }
    })

    const result = Array.from(aggregated.values())
    
    // Sort by FTD descending and take top 15
    return result.sort((a, b) => b.ftd - a.ftd).slice(0, 15)
  }, [data])

  const totalFtd = data.reduce((sum, row) => sum + row.ftd, 0)
  const maxFtd = Math.max(...chartData.map(d => d.ftd), 1)

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  if (chartData.length === 0) {
    return null
  }

  if (chartData.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
      {/* Header with minimize toggle */}
      <div className="flex justify-between items-center p-4 md:p-6 pb-3 md:pb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">Top 15 Brands by FTD</h2>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label={isMinimized ? "Expand chart" : "Minimize chart"}
        >
          {isMinimized ? (
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Collapsible content */}
      {!isMinimized && (
        <>
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="space-y-1.5 md:space-y-2">
              {chartData.map((item, index) => {
                const percentage = totalFtd > 0 ? (item.ftd / totalFtd) * 100 : 0
                const isHovered = hoveredBrand === item.brand
                const barWidth = (item.ftd / maxFtd) * 100
                
                return (
                  <div 
                    key={item.brand} 
                    className="relative"
                    onMouseEnter={() => setHoveredBrand(item.brand)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      {/* Brand name - fixed width */}
                      <div className="w-20 sm:w-28 md:w-32 flex-shrink-0">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 truncate block">{item.brand}</span>
                      </div>
                      
                      {/* Horizontal bar */}
                      <div className="flex-1 relative">
                        <div className="h-5 sm:h-6 bg-gray-100 dark:bg-gray-700 rounded-sm overflow-hidden cursor-pointer">
                          <div
                            className="h-full transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex items-center px-2"
                            style={{ width: `${barWidth}%` }}
                          >
                            {barWidth > 20 && (
                              <span className="text-xs font-semibold text-white">
                                {item.ftd.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats - fixed width */}
                      <div className="w-20 sm:w-24 md:w-28 flex-shrink-0 text-right">
                        <div className="text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {item.ftd.toLocaleString()}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute z-30 left-32 top-full mt-1 bg-gray-900 text-white text-xs rounded-lg shadow-xl p-3 min-w-[220px]">
                        <div className="font-semibold mb-2 text-sm">{item.brand}</div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">FTDs:</span>
                            <span className="font-semibold text-white">{item.ftd.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Revenue:</span>
                            <span className="font-semibold text-white">€{formatCurrency(item.revenue)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">% of Total FTDs:</span>
                            <span className="font-semibold text-white">{percentage.toFixed(2)}%</span>
                          </div>
                        </div>
                        {/* Arrow pointing up */}
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase">Total FTDs</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {totalFtd.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase">Total Revenue</div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  €{formatCurrency(chartData.reduce((sum, item) => sum + item.revenue, 0))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Minimized summary */}
      {isMinimized && (
        <div className="px-4 md:px-6 pb-4 md:pb-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase">Top Brand</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {chartData[0]?.brand}
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase">Total FTDs</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                {totalFtd.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase">Total Revenue</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                €{formatCurrency(chartData.reduce((sum, item) => sum + item.revenue, 0))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

