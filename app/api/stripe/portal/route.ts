import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  return NextResponse.json({
    message: 'Stripe portal is disabled for this public showcase project.',
  });
}
