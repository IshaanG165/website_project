export const config = {
  runtime: 'edge',
  regions: ['syd1'] // Sydney region for Australian users
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { visitorName, unitNumber, visitDate, contactNumber } = await request.json()

    // Validate input
    if (!visitorName || !unitNumber || !visitDate || !contactNumber) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Store in KV (Key-Value) store
    const visitorId = crypto.randomUUID()
    const visitorData = {
      visitorName,
      unitNumber,
      visitDate,
      contactNumber,
      timestamp: new Date().toISOString()
    }

    // In a real implementation, you would store this in a database
    // For demo purposes, we'll just return the data
    return new Response(JSON.stringify({
      success: true,
      visitorId,
      data: visitorData
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
} 