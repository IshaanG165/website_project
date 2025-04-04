export const config = {
  runtime: 'edge',
  regions: ['syd1']
}

// Sample unit data
const sampleUnits = {
  '101': {
    unitNumber: '101',
    owner: 'John Smith',
    contact: 'john.smith@email.com',
    requests: [
      {
        requestId: 'CR-1',
        subject: 'Maintenance Request',
        status: 'completed',
        timestamp: '2024-03-15T10:30:00Z'
      },
      {
        requestId: 'CR-2',
        subject: 'General Inquiry',
        status: 'pending',
        timestamp: '2024-04-01T14:20:00Z'
      }
    ]
  },
  '102': {
    unitNumber: '102',
    owner: 'Sarah Johnson',
    contact: 'sarah.j@email.com',
    requests: [
      {
        requestId: 'CR-3',
        subject: 'Parking Issue',
        status: 'in-progress',
        timestamp: '2024-03-20T09:15:00Z'
      }
    ]
  },
  '201': {
    unitNumber: '201',
    owner: 'Michael Brown',
    contact: 'm.brown@email.com',
    requests: [
      {
        requestId: 'CR-4',
        subject: 'Noise Complaint',
        status: 'completed',
        timestamp: '2024-03-25T16:45:00Z'
      },
      {
        requestId: 'CR-5',
        subject: 'Maintenance Request',
        status: 'pending',
        timestamp: '2024-04-02T11:30:00Z'
      }
    ]
  }
}

// In-memory storage for contact requests
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

  // Handle GET request for retrieving unit information
  if (request.method === 'GET') {
    try {
      const url = new URL(request.url)
      const unitNumber = url.searchParams.get('unitNumber')
      
      if (!unitNumber) {
        return new Response('Unit number is required', { status: 400 })
      }

      // Check if unit exists in sample data
      const unitData = sampleUnits[unitNumber]
      
      if (!unitData) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Unit not found',
          data: null
        }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }

      // Get contact requests for this unit
      const unitRequests = contactRequests.filter(req => req.unitNumber === unitNumber)
      
      // Combine sample data with actual requests
      const responseData = {
        ...unitData,
        recentRequests: [...unitData.requests, ...unitRequests].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
      }

      return new Response(JSON.stringify({
        success: true,
        data: responseData
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