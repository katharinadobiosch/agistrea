'use client'

import { useState } from 'react'

type CalendarDay = {
  date: Date
  available: boolean
  price: number | null
  isToday: boolean
  isSelected: boolean
  isPast: boolean
}

type PricingCalendarProps = {
  propertyId: string
  defaultPrice: number
  currency?: string
  availability: Array<{
    day: string
    available: boolean
    price_per_night: number | null
  }>
}

export function PricingCalendar({
  propertyId,
  defaultPrice,
  currency = 'EUR',
  availability = [],
}: PricingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [bulkPrice, setBulkPrice] = useState<string>('')
  const [bulkAvailable, setBulkAvailable] = useState<boolean>(true)
  const [saving, setSaving] = useState(false)

  // Generate calendar days for current month
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    const days: CalendarDay[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let current = new Date(startDate)
    while (current <= lastDay || current.getDay() !== 0) {
      const dateStr = current.toISOString().split('T')[0]
      const availData = availability.find(a => a.day === dateStr)

      days.push({
        date: new Date(current),
        available: availData?.available ?? true,
        price: availData?.price_per_night ?? null,
        isToday: current.getTime() === today.getTime(),
        isSelected: selectedDates.some(d => d.getTime() === current.getTime()),
        isPast: current < today,
      })

      current.setDate(current.getDate() + 1)
      if (current.getMonth() !== month && current.getDay() === 0) break
    }

    return days
  }

  const days = generateCalendarDays()
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const toggleDateSelection = (date: Date) => {
    if (date < new Date()) return // Can't select past dates

    setSelectedDates(prev => {
      const exists = prev.find(d => d.getTime() === date.getTime())
      if (exists) {
        return prev.filter(d => d.getTime() !== date.getTime())
      } else {
        return [...prev, date]
      }
    })
  }

  const handleBulkUpdate = async () => {
    if (selectedDates.length === 0) return

    setSaving(true)
    try {
      const updates = selectedDates.map(date => ({
        property_id: propertyId,
        day: date.toISOString().split('T')[0], // ✅
        available: bulkAvailable,
        price_per_night: bulkPrice ? Number(bulkPrice) : null,
      }))

      const response = await fetch('/api/properties/availability/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      })

      if (response.ok) {
        // Refresh page or update state
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to update availability:', error)
    } finally {
      setSaving(false)
    }
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg sm:text-xl" style={{ color: '#3a3632' }}>
          {monthName}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition hover:bg-gray-50"
            style={{ borderColor: '#e0d8cc' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition hover:bg-gray-50"
            style={{ borderColor: '#e0d8cc' }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-xs font-medium" style={{ color: '#8a8178' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isCurrentMonth = day.date.getMonth() === currentMonth.getMonth()
          const displayPrice = day.price ?? defaultPrice

          return (
            <button
              key={i}
              type="button"
              onClick={() => toggleDateSelection(day.date)}
              disabled={day.isPast}
              className="relative aspect-square rounded-lg border p-1 text-left transition"
              style={{
                borderColor: day.isSelected ? '#d97346' : '#e0d8cc',
                backgroundColor: day.isSelected
                  ? 'rgba(217, 115, 70, 0.08)'
                  : !day.available
                    ? 'rgba(0, 0, 0, 0.02)'
                    : 'white',
                opacity: day.isPast || !isCurrentMonth ? 0.3 : 1,
                cursor: day.isPast ? 'not-allowed' : 'pointer',
              }}
            >
              {/* Date */}
              <div
                className="text-xs font-medium sm:text-sm"
                style={{ color: day.isToday ? '#d97346' : '#3a3632' }}
              >
                {day.date.getDate()}
              </div>

              {/* Price */}
              {isCurrentMonth && !day.isPast && (
                <div className="mt-0.5 text-[10px] leading-tight" style={{ color: '#8a8178' }}>
                  {day.available ? <>€{displayPrice}</> : <span className="text-red-500">N/A</span>}
                </div>
              )}

              {/* Selected indicator */}
              {day.isSelected && (
                <div
                  className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#d97346' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Bulk actions */}
      {selectedDates.length > 0 && (
        <div
          className="space-y-3 rounded-xl border p-4"
          style={{
            borderColor: '#e0d8cc',
            backgroundColor: 'rgba(217, 115, 70, 0.04)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: '#3a3632' }}>
              {selectedDates.length} {selectedDates.length === 1 ? 'date' : 'dates'} selected
            </span>
            <button
              type="button"
              onClick={() => setSelectedDates([])}
              className="text-xs underline"
              style={{ color: '#8a8178' }}
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label className="mb-1 block text-xs" style={{ color: '#534f49' }}>
                Price per night (€)
              </label>
              <input
                type="number"
                value={bulkPrice}
                onChange={e => setBulkPrice(e.target.value)}
                placeholder={`Default: ${defaultPrice}`}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: '#e0d8cc' }}
              />
            </div>

            <div className="flex-1">
              <label className="mb-1 block text-xs" style={{ color: '#534f49' }}>
                Availability
              </label>
              <select
                value={bulkAvailable ? 'available' : 'unavailable'}
                onChange={e => setBulkAvailable(e.target.value === 'available')}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: '#e0d8cc' }}
              >
                <option value="available">Available</option>
                <option value="unavailable">Not available</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBulkUpdate}
            disabled={saving}
            className="add-stay-button w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update selected dates'}
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: '#8a8178' }}>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded border"
            style={{ borderColor: '#e0d8cc', backgroundColor: 'white' }}
          />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border bg-gray-50" style={{ borderColor: '#e0d8cc' }} />
          <span>Not available</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded border"
            style={{ borderColor: '#d97346', backgroundColor: 'rgba(217, 115, 70, 0.08)' }}
          />
          <span>Selected</span>
        </div>
      </div>
    </div>
  )
}
