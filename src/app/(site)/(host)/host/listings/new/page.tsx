import { createPropertyAction } from '../../actions'

export default function NewListingPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-muted-ink)]">
        Create a draft listing. We set up the basics and send you to the editor.
      </p>

      <form action={createPropertyAction}>
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-sm font-medium text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover-bg)]"
        >
          Create listing
        </button>
      </form>
    </div>
  )
}
