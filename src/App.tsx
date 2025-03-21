import { useState } from 'react'
import { Badge } from './components/Badge'
import { Terminal } from './components/Terminal'
import './App.css'

const positions = [
  { title: "Macrodata Refiner", dept: "Macrodata Refinement" },
  { title: "Data Analyst", dept: "Macrodata Refinement" },
  { title: "Quality Assurance", dept: "Optics & Design" },
  { title: "Wellness Counselor", dept: "Wellness" },
  { title: "Security Officer", dept: "Security" },
  { title: "Chief of Security", dept: "Security" },
  { title: "Board Liaison", dept: "Executive" },
  { title: "Chief Executive Officer", dept: "Executive" },
  { title: "Design Director", dept: "Optics & Design" },
  { title: "Research Lead", dept: "Research & Development" }
];

function formatName(name: string): string {
  const parts = name.trim().split(' ');
  const firstName = parts[0];
  const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `${firstName} ${lastInitial}`.toUpperCase();
}

function getHashFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getPosition(name: string) {
  const formattedName = formatName(name);
  if (formattedName === 'JOHN S') {
    return {
      title: 'Staring-at-Numbers Expert',
      dept: 'Macrodata Refinement'
    };
  }
  const hash = getHashFromString(name);
  return positions[hash % positions.length];
}

function App() {
  const [name, setName] = useState('');
  const [badgeInfo, setBadgeInfo] = useState<{ name: string; position: string; department: string } | null>(null);
  const [messages, setMessages] = useState<Array<{ text: string; delay: number }>>([]);
  const [showBadge, setShowBadge] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const updateBadge = async () => {
    if (name) {
      setShowBadge(false);
      setShowTerminal(true);
      const formattedName = formatName(name);
      const position = getPosition(name);

      setBadgeInfo({
        name: formattedName,
        position: position.title.toUpperCase(),
        department: position.dept
      });

      setMessages([
        { text: "INITIALIZING BADGE CREATION PROTOCOL...", delay: 1000 },
        { text: `EMPLOYEE IDENTIFIED: ${formattedName}`, delay: 1500 },
        { text: `CLEARANCE LEVEL: ${position.dept === 'Macrodata Refinement' ? 'MDR' : 'GEN'}`, delay: 1000 },
        { text: "GENERATING SECURE CREDENTIALS...", delay: 1500 },
        { text: "BADGE CREATION COMPLETE.", delay: 1000 }
      ]);

      // Wait for all messages to complete (sum of delays plus extra buffer)
      await sleep(7000);
      setShowBadge(true);
      
      // Start exit animation and wait for it to complete
      const terminalRef = document.querySelector('.terminal');
      if (terminalRef) {
        terminalRef.classList.add('terminal-exit');
        await sleep(500); // Wait for exit animation
      }
      setShowTerminal(false);
    }
  };

  const printBadge = () => {
    window.print();
    setMessages(prev => [
      ...prev,
      { text: "> INITIATING PRINT SEQUENCE...", delay: 600 },
      { text: "> SENDING TO SECURE PRINTER...", delay: 800 },
      { text: "> VERIFYING SECURITY CLEARANCE...", delay: 600 },
      { text: "> CLEARANCE VERIFIED", delay: 400 },
      { text: "> PRINT JOB CONFIRMED", delay: 600 }
    ]);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>LUMON INDUSTRIES</h1>
        <h2>Employee Badge Generator</h2>
        
        <div className="controls">
          <input
            type="text"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={updateBadge} className="update-button">Create Badge</button>
          <button onClick={printBadge} className="print-button">Print Badge</button>
        </div>

        {badgeInfo && showBadge && <Badge {...badgeInfo} />}
        {showTerminal && <Terminal messages={messages} />}
      </div>
    </div>
  );
}

export default App
