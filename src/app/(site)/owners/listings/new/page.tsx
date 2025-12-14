"use client";

import { FormEvent } from "react";

export default function NewListingPage() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const body = {
      title: formData.get("title"),
      location: formData.get("location"),
      description: formData.get("description"),
      nightly_price: formData.get("nightly_price"),
    };

    await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-[var(--text-main)]">Title</label>
        <input
          name="title"
          className="mt-1 w-full rounded border border-[var(--border-light)] bg-[var(--color-soft-white)] px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[var(--text-main)]">
          Location
        </label>
        <input
          name="location"
          className="mt-1 w-full rounded border border-[var(--border-light)] bg-[var(--color-soft-white)] px-3 py-2 text-sm"
        />
      </div>

      {/* …weitere Felder… */}

      <button
        type="submit"
        className="mt-4 inline-flex items-center rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-sm font-medium text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover-bg)]"
      >
        Save listing
      </button>
    </form>
  );
}
