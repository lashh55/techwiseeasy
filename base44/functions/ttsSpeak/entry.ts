import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const VOICE_ID = '1V7weZGeWTy8iaT6gn0O';
const MODEL_ID = 'eleven_multilingual_v2';

// In-process cache: cacheKey → base64 string
const audioCache = new Map();

Deno.serve(async (req) => {
  try {
    // We don't enforce auth — audio narration is a UX feature for all users
    const body = await req.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return Response.json({ error: 'No text provided' }, { status: 400 });
    }

    const cacheKey = text.trim().slice(0, 500);

    // Return cached base64 if available
    if (audioCache.has(cacheKey)) {
      return Response.json({ audio: audioCache.get(cacheKey) });
    }

    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!apiKey) {
      return Response.json({ error: 'ELEVENLABS_API_KEY not set' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return Response.json({ error: `ElevenLabs API error: ${err}` }, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();

    // Convert to base64
    const uint8 = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < uint8.length; i++) {
      binary += String.fromCharCode(uint8[i]);
    }
    const base64 = btoa(binary);

    // Cache (protect credits for repeated text)
    if (audioCache.size < 200) {
      audioCache.set(cacheKey, base64);
    }

    return Response.json({ audio: base64 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});