// app/api/listings/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  // TODO: Auth → host aus Session holen
  const listing = await db.listing.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      location: body.location,
      nightlyPrice: body.nightlyPrice,
      hostId: body.hostId,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}
