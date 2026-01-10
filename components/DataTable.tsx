'use client'

import { DashboardData } from './Dashboard'

interface DataTableProps {
  data: DashboardData[]
}

export default function DataTable({ data }: DataTableProps) {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No data available. Please check your filters or Google Sheets configuration.
      </div>
    )
  }

  // Calculate grand totals
  const totals = {
    registrations: data.reduce((sum, row) => sum + row.registrations, 0),
    ftd: data.reduce((sum, row) => sum + row.ftd, 0),
    qp: data.reduce((sum, row) => sum + row.qp, 0),
    revenue: data.reduce((sum, row) => sum + row.revenue, 0),
    expense: data.reduce((sum, row) => sum + row.expense, 0),
    profit: data.reduce((sum, row) => sum + row.profit, 0),
  }
  const totalRoi = totals.expense > 0 ? (totals.profit / totals.expense) * 100 : 0

  return (
    <div className="overflow-x-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
      <table className="w-full text-xs sm:text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 sticky top-0 z-10">
          <tr>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Date</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-left text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Code</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Signup</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">FTD</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Q-FTD</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Revenue</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Expense</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Profit</th>
            <th className="px-2 sm:px-3 py-1.5 sm:py-2 text-right text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">ROI</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 whitespace-nowrap">{row.date}</td>
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap">{row.code}</td>
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">{row.registrations.toLocaleString()}</td>
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">{row.ftd.toLocaleString()}</td>
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">{row.qp.toLocaleString()}</td>
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right font-medium whitespace-nowrap">€{formatCurrency(row.revenue)}</td>
              <td className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right font-medium whitespace-nowrap">€{formatCurrency(row.expense)}</td>
              <td className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-right font-medium whitespace-nowrap ${row.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                €{formatCurrency(row.profit)}
              </td>
              <td className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-right font-medium whitespace-nowrap ${row.roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {row.roi.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 dark:bg-gray-700 border-t-2 border-gray-300 dark:border-gray-600 sticky bottom-0">
          <tr className="font-bold">
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 whitespace-nowrap" colSpan={2}>TOTAL</td>
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">{totals.registrations.toLocaleString()}</td>
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">{totals.ftd.toLocaleString()}</td>
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">{totals.qp.toLocaleString()}</td>
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">€{formatCurrency(totals.revenue)}</td>
            <td className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 text-right whitespace-nowrap">€{formatCurrency(totals.expense)}</td>
            <td className={`px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-right whitespace-nowrap ${totals.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              €{formatCurrency(totals.profit)}
            </td>
            <td className={`px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs text-right whitespace-nowrap ${totalRoi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalRoi.toFixed(1)}%
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

