'use client';
import { useEffect } from 'react';

export default function SeatCrackerChatbot() {
  useEffect(() => {
    // 1. Inject the CSS safely
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Load the JS Module and initialize the chat
    // @ts-ignore - Next.js/Webpack might complain about absolute URL imports, ignoring for now
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(({ createChat }) => {
        createChat({
          webhookUrl: 'https://valtoooy.app.n8n.cloud/webhook/63947dc1-8cee-4b53-a31b-c88e09220e5b/chat',
          initialMessages: [
            'Hi there! 👋',
            'My name is Seater. How can I assist you with your exam prep today?'
          ],
          showWelcomeScreen: true,
          mode: 'window', 
          theme: {
            primaryColor: '#0070f3',
          }
        });
      })
      .catch((err) => console.error("Chat failed to load:", err));
  }, []);

  // This component doesn't render anything visible directly, the script handles the UI
  return null; 
}
