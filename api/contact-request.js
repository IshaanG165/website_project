export const config = {
  runtime: 'edge',
  regions: ['syd1']
}

// In-memory storage for demo purposes
// In a real implementation, use a database
let contactRequests = []

export default async function handler(request) {
  // Handle POST request for submitting contact requests
  if (request.method === 'POST') {
    try {
      const { name, email, subject, message, unitNumber } = await request.json()

      // Validate input
      if (!name || !email || !subject || !message) {
        return new Response('Missing required fields', { status: 400 })
      }

      // Generate request ID
      const requestId = `CR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      const contactData = {
        requestId,
        name,
        email,
        subject,
        message,
        unitNumber: unitNumber || 'N/A',
        status: 'new',
        timestamp: new Date().toISOString()
      }

      // Store the request
      contactRequests.push(contactData)

      return new Response(JSON.stringify({
        success: true,
        requestId,
        data: contactData
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      return new Response('Internal server error', { status: 500 })
    }
  }

  // Handle GET request for retrieving contact requests
  if (request.method === 'GET') {
    try {
      const url = new URL(request.url)
      const status = url.searchParams.get('status')
      const unitNumber = url.searchParams.get('unitNumber')
      const authToken = request.headers.get('Authorization')

      // In a real implementation, validate the auth token
      if (!authToken) {
        return new Response('Unauthorized', { status: 401 })
      }

      // Filter requests based on query parameters
      let filteredRequests = [...contactRequests]

      if (status) {
        filteredRequests = filteredRequests.filter(req => req.status === status)
      }

      if (unitNumber) {
        filteredRequests = filteredRequests.filter(req => req.unitNumber === unitNumber)
      }

      // Sort by timestamp (newest first)
      filteredRequests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

      return new Response(JSON.stringify({
        success: true,
        count: filteredRequests.length,
        data: filteredRequests
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=60'
        }
      })
    } catch (error) {
      return new Response('Internal server error', { status: 500 })
    }
  }

  return new Response('Method not allowed', { status: 405 })
} 