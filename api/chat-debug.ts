import type { IncomingMessage, ServerResponse } from 'node:http';

interface ChatRequest extends IncomingMessage {
  body: unknown;
}

interface ChatResponse extends ServerResponse {
  status: (code: number) => ChatResponse;
  json: (body: { error?: string; reply?: string }) => void;
}

export default async function handler(
  request: ChatRequest,
  response: ChatResponse,
) {
  return response.status(200).json({ reply: 'ping-ok' });
}
