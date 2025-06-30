addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function handleRequest(request) {
  const url = new URL(request.url)

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  if (url.pathname === '/api/reviews' && request.method === 'POST') {
    try {
      const review = await request.json()
      const key = `review:${Date.now()}`
      await REVIEWS.put(key, JSON.stringify(review))
      return new Response(JSON.stringify({ message: 'Review saved!', review }), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      })
    } catch {
      return new Response('Invalid JSON', {
        status: 400,
        headers: CORS_HEADERS,
      })
    }
  }

  if (url.pathname === '/api/reviews' && request.method === 'GET') {
    const reviews = []
    const list = await REVIEWS.list()
    for (const { name } of list.keys) {
      const data = await REVIEWS.get(name)
      if (data) reviews.push(JSON.parse(data))
    }
    return new Response(JSON.stringify(reviews), {
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    })
  }

  return new Response('Not Found', { status: 404, headers: CORS_HEADERS })
}
