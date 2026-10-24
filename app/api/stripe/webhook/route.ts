import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  const payload = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Checkout completed for session', session.id);
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      console.log('Subscription cancelled', subscription.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error', error);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }
}
