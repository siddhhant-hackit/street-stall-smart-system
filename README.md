# RestaurantOS SaaS scaffold

This repository now contains a Next.js-based SaaS starter for a restaurant operations platform.

## Stack

- Frontend: Next.js
- Database: Supabase
- Auth: Supabase Auth or Clerk-ready integration
- Billing: Stripe
- Deploy: Vercel

## Local setup

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and configure values.
3. Run the app:
   `npm run dev`
4. Open `http://localhost:3000`

## Features included in the scaffold

- Landing page for product positioning
- Restaurant operations dashboard
- Reservation overview
- Kitchen queue and guest insights
- SaaS-ready app structure for multi-tenant use
- Supabase and Stripe integration placeholders

## Notes

This version intentionally avoids browser-side AI API usage so the app can be deployed and sold as a real SaaS product instead of a prototype tied to AI Studio or Gemini.
