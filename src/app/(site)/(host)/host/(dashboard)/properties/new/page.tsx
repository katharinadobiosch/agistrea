'use client'

import { createPropertyAction } from '../../../actions'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="add-stay-button group relative w-full overflow-hidden rounded-2xl px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Creating your stay...
          </>
        ) : (
          <>
            <svg
              className="h-5 w-5 transition-transform group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create listing
          </>
        )}
      </span>
    </button>
  )
}

export default function NewListingPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Hero Section */}
        <div className="relative mb-8 sm:mb-12">
          {/* Decorative elements - mobile optimized */}
          <div
            className="absolute top-0 -left-8 h-24 w-24 rounded-full blur-3xl sm:h-32 sm:w-32"
            style={{ backgroundColor: '#d97346', opacity: 0.08 }}
          />
          <div
            className="absolute top-4 -right-6 h-20 w-20 rounded-full blur-2xl sm:h-24 sm:w-24"
            style={{ backgroundColor: '#93a485', opacity: 0.1 }}
          />

          <div className="relative">
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-px w-8 sm:w-12"
                style={{ backgroundColor: '#d97346', opacity: 0.6 }}
              />
              <span
                className="text-xs tracking-wider uppercase"
                style={{ color: '#d97346', opacity: 0.75 }}
              >
                New property
              </span>
            </div>

            <h1
              className="mb-3 font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl"
              style={{ color: '#3a3632' }}
            >
              Start your listing
            </h1>

            <p className="text-base leading-relaxed sm:text-lg" style={{ color: '#8a8178' }}>
              We'll create a draft for you and guide you through each step.
              <br className="hidden sm:inline" />
              Take your time – everything grows at its own pace.
            </p>
          </div>
        </div>

        {/* Info Cards - Mobile Stacked */}
        <div className="mb-8 space-y-4 sm:mb-10 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0">
          <div
            className="rounded-2xl border bg-white/80 p-4 backdrop-blur-sm sm:rounded-3xl sm:p-5"
            style={{ borderColor: 'rgba(147, 164, 133, 0.22)' }}
          >
            <div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12"
              style={{ backgroundColor: 'rgba(147, 164, 133, 0.12)' }}
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                style={{ color: '#93a485' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-medium sm:text-base" style={{ color: '#3a3632' }}>
              Draft created
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: '#8a8178' }}>
              No pressure – save and come back anytime
            </p>
          </div>

          <div
            className="rounded-2xl border bg-white/80 p-4 backdrop-blur-sm sm:rounded-3xl sm:p-5"
            style={{ borderColor: 'rgba(244, 165, 125, 0.22)' }}
          >
            <div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12"
              style={{ backgroundColor: 'rgba(244, 165, 125, 0.12)' }}
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                style={{ color: '#f4a57d' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-medium sm:text-base" style={{ color: '#3a3632' }}>
              Add details
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: '#8a8178' }}>
              Photos, description, amenities
            </p>
          </div>

          <div
            className="rounded-2xl border bg-white/80 p-4 backdrop-blur-sm sm:rounded-3xl sm:p-5"
            style={{ borderColor: 'rgba(217, 115, 70, 0.22)' }}
          >
            <div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12"
              style={{ backgroundColor: 'rgba(217, 115, 70, 0.12)' }}
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                style={{ color: '#d97346' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-medium sm:text-base" style={{ color: '#3a3632' }}>
              Ready to list
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: '#8a8178' }}>
              Publish when you're ready
            </p>
          </div>
        </div>

        {/* Main Card with Form */}
        <div
          className="rounded-2xl border bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8 lg:p-10"
          style={{ borderColor: '#e0d8cc' }}
        >
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-3 font-serif text-xl sm:text-2xl" style={{ color: '#3a3632' }}>
              Let's get started
            </h2>
            <p className="text-sm leading-relaxed sm:text-base" style={{ color: '#8a8178' }}>
              Click below to create your draft listing. We'll set up the essentials, and you can add
              the rest at your own pace. The editor will open with everything ready for you to
              customize.
            </p>
          </div>

          {/* What happens next */}
          <div
            className="mb-6 space-y-3 rounded-xl p-4 sm:mb-8 sm:rounded-2xl sm:p-5"
            style={{ backgroundColor: 'rgba(147, 164, 133, 0.08)' }}
          >
            <h3
              className="flex items-center gap-2 text-sm font-medium sm:text-base"
              style={{ color: '#3a3632' }}
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                style={{ color: '#93a485' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What happens next?
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm" style={{ color: '#534f49' }}>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs"
                  style={{ backgroundColor: 'rgba(147, 164, 133, 0.15)', color: '#93a485' }}
                >
                  1
                </span>
                <span>We create a draft property with basic settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs"
                  style={{ backgroundColor: 'rgba(147, 164, 133, 0.15)', color: '#93a485' }}
                >
                  2
                </span>
                <span>You're redirected to the full editor</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs"
                  style={{ backgroundColor: 'rgba(147, 164, 133, 0.15)', color: '#93a485' }}
                >
                  3
                </span>
                <span>Add photos, details, pricing – step by step</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form action={createPropertyAction}>
            <SubmitButton />
          </form>

          {/* Helper text */}
          <p className="mt-4 text-xs sm:text-sm" style={{ color: '#8a8178', opacity: 0.7 }}>
            Your listing will be saved as a draft. You can edit it anytime before publishing.
          </p>
        </div>

        {/* Bottom spacing - mobile optimized */}
        <div className="h-8 sm:h-12 lg:h-16" />
      </div>
    </div>
  )
}
