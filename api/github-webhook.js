// api/github-webhook.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { repo, message } = await req.json();

    console.log(`Received update for repo ${repo} with message: ${message}`);

    // Here you can handle the update logic, such as triggering a rebuild or update

    // Respond to acknowledge receipt of the webhook
    return NextResponse.json({ status: 'success', message: 'Update received' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ status: 'error', message: 'Error processing webhook' }, { status: 500 });
  }
}
