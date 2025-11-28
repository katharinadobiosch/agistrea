// (vereinfacht) owners/listings/new/page.tsx
"use client";

export default function NewListingPage() {
  async function handleSubmit(formData: FormData) {
    // hier fetch auf /api/listings
  }

  return <form onSubmit={handleSubmit}>{/* Inputs */}</form>;
}
