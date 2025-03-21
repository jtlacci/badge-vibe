import { useEffect, useState } from 'react';
import './Terminal.css';

interface Message {
  text: string;
  delay: number;
}

interface TerminalProps {
  messages: Message[];
}

export const Terminal = ({ messages }: TerminalProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setDisplayedMessages([]);
    setCurrentIndex(0);
    setIsExiting(false);
  }, [messages]);

  useEffect(() => {
    if (currentIndex < messages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, messages[currentIndex].text]);
        setCurrentIndex(prev => prev + 1);
      }, messages[currentIndex].delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, messages]);

  return (
    <div className={`terminal ${isExiting ? 'terminal-exit' : ''}`}>
      <div className="terminal-header">
        <div className="terminal-title">LUMON INDUSTRIES - SECURITY TERMINAL</div>
        <div className="terminal-controls">
          <span className="terminal-dot"></span>
          <span className="terminal-dot"></span>
          <span className="terminal-dot"></span>
        </div>
      </div>
      <div className="terminal-content">
        {displayedMessages.map((msg, index) => (
          <div key={index} className="terminal-line">
            <span className="terminal-prompt">&gt;</span>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};
