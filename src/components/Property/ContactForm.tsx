'use client'

import { useState } from 'react'

type ContactFormProps = {
  propertyTitle: string
  contactEmail: string
  contactPhone: string
}

export function ContactForm({ propertyTitle, contactEmail, contactPhone }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    checkIn: '',
    checkOut: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      // Here you would send the inquiry to your backend
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000))

      // You could also directly mailto:
      const subject = `Inquiry about ${propertyTitle}`
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Check-in: ${formData.checkIn}
Check-out: ${formData.checkOut}

Message:
${formData.message}
      `.trim()

      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      setSent(true)
    } catch (error) {
      console.error('Failed to send inquiry:', error)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-xl border p-6 text-center"
        style={{
          borderColor: 'rgba(147, 164, 133, 0.3)',
          backgroundColor: 'rgba(147, 164, 133, 0.08)',
        }}
      >
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(147, 164, 133, 0.2)' }}
        >
          <svg
            className="h-6 w-6"
            style={{ color: '#93a485' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 font-serif text-lg" style={{ color: '#3a3632' }}>
          Message sent!
        </h3>
        <p className="text-sm" style={{ color: '#8a8178' }}>
          The host will get back to you soon. Check your email for their response.
        </p>
      </div>
    )
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Email row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: '#534f49' }}>
            Your name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Maria Schmidt"
            className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:outline-none"
            style={
              {
                borderColor: '#e0d8cc',
                '--tw-ring-color': 'rgba(217, 115, 70, 0.3)',
              } as any
            }
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: '#534f49' }}>
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="maria@example.com"
            className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:outline-none"
            style={
              {
                borderColor: '#e0d8cc',
                '--tw-ring-color': 'rgba(217, 115, 70, 0.3)',
              } as any
            }
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium" style={{ color: '#534f49' }}>
          Phone <span className="font-normal opacity-60">(optional)</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+49 ..."
          className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:outline-none"
          style={
            {
              borderColor: '#e0d8cc',
              '--tw-ring-color': 'rgba(217, 115, 70, 0.3)',
            } as any
          }
        />
      </div>

      {/* Dates row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: '#534f49' }}>
            Check-in
          </label>
          <input
            type="date"
            value={formData.checkIn}
            onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
            className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:outline-none"
            style={
              {
                borderColor: '#e0d8cc',
                '--tw-ring-color': 'rgba(217, 115, 70, 0.3)',
              } as any
            }
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" style={{ color: '#534f49' }}>
            Check-out
          </label>
          <input
            type="date"
            value={formData.checkOut}
            onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
            className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:outline-none"
            style={
              {
                borderColor: '#e0d8cc',
                '--tw-ring-color': 'rgba(217, 115, 70, 0.3)',
              } as any
            }
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="mb-1 block text-sm font-medium" style={{ color: '#534f49' }}>
          Your message
        </label>
        <textarea
          required
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          placeholder="Hi! I'm interested in booking your place for..."
          className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:outline-none"
          style={
            {
              borderColor: '#e0d8cc',
              '--tw-ring-color': 'rgba(217, 115, 70, 0.3)',
            } as any
          }
        />
      </div>

      {/* Contact info display */}
      {(contactEmail || contactPhone) && (
        <div
          className="rounded-lg border p-4 text-sm"
          style={{
            borderColor: '#e0d8cc',
            backgroundColor: 'rgba(147, 164, 133, 0.04)',
          }}
        >
          <p className="mb-2 font-medium" style={{ color: '#3a3632' }}>
            Or reach out directly:
          </p>
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              className="block hover:underline"
              style={{ color: '#d97346' }}
            >
              {contactEmail}
            </a>
          )}
          {contactPhone && (
            <a
              href={`tel:${contactPhone}`}
              className="block hover:underline"
              style={{ color: '#d97346' }}
            >
              {contactPhone}
            </a>
          )}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={sending}
        className="add-stay-button w-full rounded-xl px-6 py-3 font-medium text-white transition disabled:opacity-50"
      >
        {sending ? 'Sending...' : 'Send inquiry'}
      </button>

      <p className="text-center text-xs" style={{ color: '#8a8178' }}>
        You'll hear back within 24 hours
      </p>
    </form>
  )
}
