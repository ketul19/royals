import { motion } from 'framer-motion';

interface Message { id: string; sender: 'user' | 'bot'; text: string; }
interface Props { message: Message; }

export default function MessageBubble({ message }: Props) {
  const isBot = message.sender === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 text-xs font-bold"
          style={{ background: 'var(--color-accent)', color: 'var(--color-text-inverse)' }}
          aria-hidden="true"
        >
          R
        </div>
      )}
      <div
        className="max-w-[80%] px-3 py-2 rounded-card text-sm leading-relaxed"
        style={{
          background: isBot ? 'var(--color-bg-primary)' : 'var(--color-accent)',
          color: isBot ? 'var(--color-text-primary)' : 'var(--color-text-inverse)',
          border: isBot ? '1px solid var(--color-border-subtle)' : 'none',
        }}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
