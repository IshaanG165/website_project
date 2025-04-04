export const config = {
  runtime: 'edge',
  regions: ['syd1']
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { unitNumber, issueType, description, priority, contactNumber } = await request.json()

    // Validate input
    if (!unitNumber || !issueType || !description || !priority || !contactNumber) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Generate maintenance request ID
    const requestId = `MR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const maintenanceData = {
      requestId,
      unitNumber,
      issueType,
      description,
      priority,
      contactNumber,
      status: 'pending',
      timestamp: new Date().toISOString()
    }

    // In a real implementation, you would:
    // 1. Store in database
    // 2. Send notification to maintenance team
    // 3. Update status in real-time

    return new Response(JSON.stringify({
      success: true,
      requestId,
      data: maintenanceData
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
} 