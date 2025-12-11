import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Lock, Skull } from 'lucide-react';

interface LoginTerminalProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginTerminal: React.FC<LoginTerminalProps> = ({ onLoginSuccess }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    "INICIANDO SISTEMA...",
    "CARGANDO KERNEL...",
    "VERIFICANDO PERMISOS DE ROOT...",
    "ACCESO DENEGADO. PROTOCOLO DE SEGURIDAD GAMMA ACTIVADO.",
    "SE REQUIERE IDENTIFICACIÓN."
  ]);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // La respuesta al acertijo
  const RIDDLE_ANSWER = "teclado";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim().toLowerCase();

    if (cleanInput === '') return;

    // Simular escritura en terminal
    setLogs(prev => [...prev, `> ${input}`]);
    setInput('');

    if (cleanInput === RIDDLE_ANSWER) {
      setLogs(prev => [...prev, "ACCESO CONCEDIDO. BIENVENIDO, ADMIN.", "CARGANDO INTERFAZ GRÁFICA..."]);
      setTimeout(() => {
        onLoginSuccess("Admin");
      }, 1500);
    } else {
      setError(true);
      setLogs(prev => [...prev, "RESPUESTA INCORRECTA. INTRUSO DETECTADO.", "INTÉNTALO DE NUEVO."]);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-green-500">
      <div className={`w-full max-w-2xl border-4 border-retro-green bg-black p-4 shadow-[0_0_20px_rgba(74,222,128,0.3)] rounded-lg ${error ? 'animate-glitch border-red-500 text-red-500' : ''}`}>
        
        {/* Header Terminal */}
        <div className="flex items-center justify-between border-b-2 border-green-800 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Terminal size={20} />
            <span className="font-pixel text-xs md:text-sm">TERMINAL_ACCESO_V1.0</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Console Logs */}
        <div ref={scrollRef} className="h-64 overflow-y-auto font-terminal text-lg md:text-xl space-y-1 mb-6 scrollbar-hide">
          {logs.map((log, index) => (
            <div key={index} className="opacity-90">{log}</div>
          ))}
        </div>

        {/* Riddle Area */}
        <div className="border border-green-900 bg-green-900/10 p-4 mb-4 rounded">
          <div className="flex items-start gap-3">
            <Lock className="shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2 glitch-text">ACERTIJO DEL GUARDIÁN:</h3>
              <p className="text-lg italic opacity-80">
                "Tengo llaves pero no abro cerraduras. <br/>
                Tengo espacio pero no habitaciones. <br/>
                Puedes entrar, pero nunca salir. <br/>
                ¿Qué soy?"
              </p>
            </div>
          </div>
        </div>

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 text-xl">
          <span className="animate-blink">_</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-terminal uppercase placeholder-green-900"
            placeholder="ESCRIBE LA CLAVE..."
            autoFocus
          />
        </form>
      </div>
      
      <p className="mt-8 text-xs font-pixel text-green-800 text-center">
        CONEXIÓN SEGURA ESTABLECIDA <br/> EL ACCESO NO AUTORIZADO ESTÁ PROHIBIDO
      </p>
    </div>
  );
};