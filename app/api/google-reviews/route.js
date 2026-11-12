import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        configured: false,
        rating: null,
        totalReviews: 0,
        googleMapsUri: null,
        writeReviewUri: null,
        reviews: [],
      },
      { status: 200 }
    );
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,googleMapsUri,reviews",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Google Places API error:", res.status, errText);
      return NextResponse.json(
        {
          configured: true,
          error: "Unable to fetch Google Reviews right now.",
          rating: null,
          totalReviews: 0,
          googleMapsUri: null,
          writeReviewUri: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
          reviews: [],
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map((rev, index) => ({
          id: rev.name || `google-review-${index}`,
          author: rev.authorAttribution?.displayName || "Google User",
          avatar: rev.authorAttribution?.photoUri || null,
          authorUri: rev.authorAttribution?.uri || null,
          rating: typeof rev.rating === "number" ? rev.rating : 5,
          quote: rev.text?.text || rev.originalText?.text || "",
          relativeTime: rev.relativePublishTimeDescription || "Recent",
          publishTime: rev.publishTime || null,
        }))
      : [];

    return NextResponse.json(
      {
        configured: true,
        businessName: data.displayName?.text || "Novity Tech",
        rating: typeof data.rating === "number" ? data.rating : null,
        totalReviews:
          typeof data.userRatingCount === "number" ? data.userRatingCount : reviews.length,
        googleMapsUri: data.googleMapsUri || null,
        writeReviewUri: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
        reviews,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("Google Reviews route error:", err);
    return NextResponse.json(
      {
        configured: true,
        error: "Unable to fetch Google Reviews right now.",
        rating: null,
        totalReviews: 0,
        googleMapsUri: null,
        writeReviewUri: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
        reviews: [],
      },
      { status: 200 }
    );
  }
}
