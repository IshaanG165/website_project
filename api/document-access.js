export const config = {
  runtime: 'edge',
  regions: ['syd1']
}

export default async function handler(request) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const url = new URL(request.url)
    const documentId = url.searchParams.get('documentId')
    const unitNumber = url.searchParams.get('unitNumber')
    const authToken = request.headers.get('Authorization')

    if (!documentId || !unitNumber || !authToken) {
      return new Response('Missing required parameters', { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Validate the auth token
    // 2. Check if the unit has access to the document
    // 3. Get the document from storage
    // 4. Apply any necessary transformations

    // Mock document data
    const documentData = {
      documentId,
      title: 'Strata Meeting Minutes',
      type: 'minutes',
      accessLevel: 'owner',
      lastModified: new Date().toISOString(),
      content: 'This is a sample document content...'
    }

    // Check access (mock implementation)
    const hasAccess = true // In real implementation, check against user permissions

    if (!hasAccess) {
      return new Response('Access denied', { status: 403 })
    }

    return new Response(JSON.stringify({
      success: true,
      data: documentData
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=3600'
      }
    })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
} 