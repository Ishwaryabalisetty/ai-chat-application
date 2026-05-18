const API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

export async function sendToAI(messages, apiKey, onChunk) {
  if (!apiKey) throw new Error('No API key found. Please add your Groq API key in Settings.')

  const formatted = messages.map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content
  }))

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      messages: [
        {
          role: 'system',
          content: `You are a helpful, knowledgeable AI assistant.
- Use markdown formatting: headers, bold, italics, lists, tables, code blocks.
- Always specify the programming language in code blocks.
- Be concise but thorough.`
        },
        ...formatted
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || ''

  // Typewriter effect
  if (onChunk) {
    let displayed = ''
    for (let i = 0; i < text.length; i++) {
      displayed += text[i]
      onChunk(displayed)
      const delay = text[i] === '\n' ? 20 : text[i] === ' ' ? 5 : 8
      await new Promise(r => setTimeout(r, delay))
    }
  }

  return text
}
