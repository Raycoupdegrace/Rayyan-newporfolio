'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { LoaderCircle, MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const copy = {
  id: {
    title: 'Tanya tentang Rayyan',
    subtitle: 'Asisten portofolio AI',
    welcome:
      'Halo! Saya asisten AI portofolio Rayyan. Tanyakan tentang keahlian, pengalaman, atau proyeknya.',
    suggestions: ['Proyek apa saja yang pernah dibuat?', 'Apa saja keahliannya?', 'Bagaimana cara menghubungi Rayyan?'],
    placeholder: 'Tulis pertanyaan...',
    send: 'Kirim pertanyaan',
    close: 'Tutup chat',
    newChat: 'Mulai percakapan baru',
    privacy: 'Jawaban berdasarkan info publik portofolio. Jangan kirim data pribadi.',
    notConfigured: 'Chat AI belum tersambung. Endpoint API belum dikonfigurasi.',
    rateLimit: 'Batas penggunaan tercapai. Coba lagi sebentar.',
    unavailable: 'Maaf, layanan AI sedang tidak tersedia. Coba lagi nanti.',
    requestError: 'Pertanyaan belum dapat dikirim. Periksa koneksi lalu coba lagi.',
    typing: 'AI sedang menjawab',
  },
  en: {
    title: 'Ask about Rayyan',
    subtitle: 'AI portfolio assistant',
    welcome:
      "Hi! I'm Rayyan's portfolio AI assistant. Ask me about his skills, experience, or projects.",
    suggestions: ['What projects has he built?', 'What are his skills?', 'How can I contact Rayyan?'],
    placeholder: 'Ask a question...',
    send: 'Send question',
    close: 'Close chat',
    newChat: 'Start a new chat',
    privacy: 'Answers use public portfolio info. Please do not share personal data.',
    notConfigured: 'AI chat is not connected yet. The API endpoint has not been configured.',
    rateLimit: 'The usage limit has been reached. Please try again shortly.',
    unavailable: 'Sorry, the AI service is temporarily unavailable. Please try again later.',
    requestError: 'Your question could not be sent. Check your connection and try again.',
    typing: 'AI is replying',
  },
} as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function PortfolioChat() {
  const { lang } = useLanguage();
  const text = copy[lang];
  const endpoint = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const nextId = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
      inputRef.current?.focus();
    }
  }, [open, messages, sending]);

  async function sendMessage(content: string) {
    const question = content.trim();
    if (!question || sending) return;

    if (!endpoint) {
      setError(text.notConfigured);
      return;
    }

    const userMessage: Message = {
      id: ++nextId.current,
      role: 'user',
      content: question,
    };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setError('');
    setSending(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversation.slice(-8).map(({ role, content: message }) => ({
            role,
            content: message,
          })),
        }),
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        const code = isRecord(payload) ? payload.error : undefined;
        if (code === 'rate_limit_exceeded' || code === 'provider_rate_limit') {
          setError(text.rateLimit);
        } else if (code === 'chat_not_configured' || code === 'origin_not_allowed') {
          setError(text.notConfigured);
        } else {
          setError(text.unavailable);
        }
        return;
      }

      const reply = isRecord(payload) ? payload.reply : undefined;
      if (typeof reply !== 'string') {
        setError(text.requestError);
        return;
      }

      setMessages((current) => [
        ...current,
        { id: ++nextId.current, role: 'assistant', content: reply },
      ]);
    } catch {
      setError(text.requestError);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label={text.title}
          className="flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-2xl shadow-black/50"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-400/10 text-accent-300">
                <MessageCircle size={19} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">{text.title}</h2>
                <p className="text-xs text-ink-400">{text.subtitle}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setError('');
                }}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={text.newChat}
                title={text.newChat}
              >
                <RotateCcw size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={text.close}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <p className="max-w-[90%] self-start whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.04] px-3.5 py-3 text-sm leading-relaxed text-ink-100">
              {text.welcome}
            </p>

            {messages.length === 0 && (
              <div className="mt-1 flex flex-col items-start gap-2">
                {text.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={sending}
                    className="max-w-full rounded-full border border-accent-400/25 px-3 py-2 text-left text-xs text-accent-200 transition-colors hover:bg-accent-400/10 disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <p
                key={message.id}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'self-end rounded-tr-sm bg-accent-400 text-ink-950'
                    : 'self-start rounded-tl-sm border border-white/[0.08] bg-white/[0.04] text-ink-100'
                }`}
              >
                {message.content}
              </p>
            ))}

            {sending && (
              <p className="inline-flex items-center gap-2 self-start text-xs text-ink-400">
                <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
                {text.typing}
              </p>
            )}
            <div />
          </div>

          <div className="border-t border-white/10 p-3">
            {error && (
              <p className="mb-2 px-1 text-xs leading-relaxed text-amber-200" role="alert">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={800}
                rows={1}
                placeholder={text.placeholder}
                aria-label={text.placeholder}
                className="max-h-28 min-h-11 flex-1 resize-y rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none placeholder:text-ink-500 focus:border-accent-400/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                aria-label={text.send}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-400 text-ink-950 transition-colors hover:bg-accent-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
            <p className="px-1 pt-2 text-[10px] leading-relaxed text-ink-500">{text.privacy}</p>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? text.close : text.title}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-accent-400 text-ink-950 shadow-lg shadow-black/30 transition-transform hover:scale-105"
      >
        {open ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
      </button>
    </div>
  );
}
