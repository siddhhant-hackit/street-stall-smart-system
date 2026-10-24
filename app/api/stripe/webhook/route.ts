import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  return NextResponse.json({
    received: true,
    message: 'Webhook disabled for this public showcase project.',
  });
}
