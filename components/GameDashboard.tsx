import React, { useState } from 'react';
import { Shield, Cpu, Wifi, HardDrive, Monitor, Plus, Trash2, Power, Battery, Save, MapPin, Barcode } from 'lucide-react';

interface GameDashboardProps {
  username: string;
  onLogout: () => void;
}

interface Equipment {
  id: number;
  name: string;
  type: 'PC' | 'Laptop' | 'Periférico' | 'Servidor';
  status: 'Operativo' | 'Dañado' | 'Mantenimiento';
  level: number; // Represents 'Age' or 'Power'
  rarity: 'common' | 'rare' | 'legendary';
  location: string;
  serialNumber: string;
}

const INITIAL_LOOT: Equipment[] = [
  { id: 1, name: 'DELL-OPTIPLEX-7090', type: 'PC', status: 'Operativo', level: 8, rarity: 'rare', location: 'OFICINA 101', serialNumber: 'CN-0M5F4T-701' },
  { id: 2, name: 'THINKPAD-X1', type: 'Laptop', status: 'Operativo', level: 10, rarity: 'legendary', location: 'SALA JUNTAS', serialNumber: 'PF-2X99L-X1' },
  { id: 3, name: 'HP-MONITOR-24', type: 'Periférico', status: 'Dañado', level: 2, rarity: 'common', location: 'ALMACÉN B', serialNumber: 'CN-4430-X-00' },
];

export const GameDashboard: React.FC<GameDashboardProps> = ({ username, onLogout }) => {
  const [inventory, setInventory] = useState<Equipment[]>(INITIAL_LOOT);
  const [showCraftModal, setShowCraftModal] = useState(false);
  
  // Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('PC');
  const [newItemRarity, setNewItemRarity] = useState('common');
  const [newItemLocation, setNewItemLocation] = useState('');
  const [newItemSerialNumber, setNewItemSerialNumber] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Equipment = {
      id: Date.now(),
      name: newItemName.toUpperCase(),
      type: newItemType as any,
      status: 'Operativo',
      level: Math.floor(Math.random() * 10) + 1,
      rarity: newItemRarity as any,
      location: newItemLocation.toUpperCase() || 'SIN ASIGNAR',
      serialNumber: newItemSerialNumber.toUpperCase() || `SN-${Math.floor(Math.random() * 100000)}`,
    };
    setInventory([...inventory, newItem]);
    setShowCraftModal(false);
    
    // Reset form
    setNewItemName('');
    setNewItemLocation('');
    setNewItemSerialNumber('');
  };

  const deleteItem = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500 text-yellow-500 shadow-yellow-500/20';
      case 'rare': return 'border-retro-purple text-retro-purple shadow-retro-purple/20';
      default: return 'border-gray-500 text-gray-400 shadow-gray-500/20';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'LEGENDARIO';
      case 'rare': return 'RARO';
      default: return 'COMÚN';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'PC': return <Cpu />;
      case 'Laptop': return <HardDrive />;
      case 'Servidor': return <Wifi />;
      default: return <Monitor />;
    }
  };

  return (
    <div className="min-h-screen bg-retro-bg text-retro-green font-terminal p-4 md:p-8">
      
      {/* Top HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Player Profile */}
        <div className="border-4 border-retro-green bg-retro-card p-4 rounded-xl flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 bg-retro-green text-black font-pixel text-[10px]">NVL 99</div>
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center border-2 border-retro-green">
            <Shield className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-pixel text-white">{username}</h2>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-retro-purple">ROL:</span> ADMIN SIS
            </div>
            <div className="w-32 h-2 bg-gray-700 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 w-[90%]"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-4 border-retro-green bg-retro-card p-4 rounded-xl flex flex-col justify-center">
          <h3 className="font-pixel text-xs text-retro-green mb-2">ESTADO DEL SISTEMA</h3>
          <div className="flex justify-between items-end border-b border-green-800 pb-2">
            <span>UNIDADES ACTIVAS:</span>
            <span className="text-2xl font-bold text-white">{inventory.filter(i => i.status === 'Operativo').length}</span>
          </div>
          <div className="flex justify-between items-end pt-2">
            <span className="text-red-400">UNIDADES DAÑADAS:</span>
            <span className="text-xl font-bold text-red-400">{inventory.filter(i => i.status !== 'Operativo').length}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
           <button 
            onClick={() => setShowCraftModal(true)}
            className="flex-1 bg-retro-green hover:bg-green-400 text-black font-pixel text-sm flex items-center justify-center gap-2 rounded border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
          >
            <Plus size={16} /> REGISTRAR EQUIPO
          </button>
          <button 
            onClick={onLogout}
            className="h-12 border-2 border-red-500 hover:bg-red-500/10 text-red-500 font-pixel text-xs flex items-center justify-center gap-2 rounded"
          >
            <Power size={16} /> CERRAR SESIÓN
          </button>
        </div>
      </div>

      {/* Main Inventory Grid */}
      <div className="border-4 border-retro-purple bg-black/50 p-6 rounded-xl relative min-h-[500px]">
        <h2 className="absolute -top-5 left-8 bg-retro-bg px-4 text-retro-purple font-pixel text-lg border-2 border-retro-purple">INVENTARIO</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {inventory.map((item) => (
            <div key={item.id} className={`bg-retro-card border-2 p-4 rounded-lg relative group transition-all hover:scale-105 hover:z-10 flex flex-col ${getRarityColor(item.rarity)}`}>
              {/* Item Header */}
              <div className="flex justify-between items-start mb-2">
                 <div className="bg-black/40 p-2 rounded">{getIcon(item.type)}</div>
                 <span className="font-pixel text-[10px] uppercase opacity-70">{getRarityLabel(item.rarity)}</span>
              </div>

              {/* Item Details */}
              <h3 className="font-bold text-xl truncate mb-1 text-white" title={item.name}>{item.name}</h3>
              <div className="text-sm opacity-80 mb-4 border-b border-gray-700 pb-2">{item.type}</div>

              {/* Extra Info: Location & Serial */}
              <div className="space-y-2 mb-4 text-xs font-mono bg-black/20 p-2 rounded">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Barcode size={12} className="shrink-0" />
                  <span className="truncate">{item.serialNumber}</span>
                </div>
              </div>

              {/* Item Stats Bar */}
              <div className="space-y-1 mb-4 mt-auto">
                <div className="flex justify-between text-xs">
                  <span>NVL PODER</span>
                  <span>{item.level}</span>
                </div>
                <div className="h-1 bg-gray-700 w-full rounded">
                  <div className="h-full bg-current w-[60%]"></div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-block px-2 py-1 text-xs rounded border text-center ${
                item.status === 'Operativo' ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-red-500 text-red-500 bg-red-500/10 animate-pulse'
              }`}>
                [{item.status}]
              </div>

              {/* Delete Action */}
              <button 
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity"
                title="Desmantelar Item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {inventory.length === 0 && (
             <div className="col-span-full flex flex-col items-center justify-center text-gray-600 py-20">
               <div className="text-6xl mb-4">☹</div>
               <p className="font-pixel text-sm">INVENTARIO VACÍO</p>
             </div>
          )}
        </div>
      </div>

      {/* Crafting Modal */}
      {showCraftModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-retro-card border-4 border-retro-pink w-full max-w-md p-6 rounded-xl shadow-[0_0_50px_rgba(244,114,182,0.3)] max-h-[90vh] overflow-y-auto">
            <h2 className="font-pixel text-retro-pink text-center mb-6 text-lg">REGISTRAR EQUIPO</h2>
            
            <form onSubmit={addItem} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-retro-pink">NOMBRE DEL EQUIPO</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-black border-2 border-retro-pink/50 text-white p-2 font-terminal text-xl focus:border-retro-pink focus:outline-none uppercase"
                  placeholder="Ej. SERVIDOR-01"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-retro-pink">NÚMERO DE SERIE</label>
                  <input 
                    type="text" 
                    value={newItemSerialNumber}
                    onChange={(e) => setNewItemSerialNumber(e.target.value)}
                    className="w-full bg-black border-2 border-retro-pink/50 text-white p-2 font-terminal text-sm focus:border-retro-pink focus:outline-none uppercase"
                    placeholder="S/N..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-retro-pink">UBICACIÓN</label>
                  <input 
                    type="text" 
                    value={newItemLocation}
                    onChange={(e) => setNewItemLocation(e.target.value)}
                    className="w-full bg-black border-2 border-retro-pink/50 text-white p-2 font-terminal text-sm focus:border-retro-pink focus:outline-none uppercase"
                    placeholder="OFICINA..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-retro-pink">CLASE / TIPO</label>
                <select 
                  value={newItemType}
                  onChange={(e) => setNewItemType(e.target.value)}
                  className="w-full bg-black border-2 border-retro-pink/50 text-white p-2 font-terminal text-xl focus:border-retro-pink focus:outline-none"
                >
                  <option value="PC">PC / Estación</option>
                  <option value="Laptop">Laptop / Portátil</option>
                  <option value="Servidor">Servidor Mainframe</option>
                  <option value="Periférico">Periférico / Acc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1 text-retro-pink">RAREZA</label>
                <div className="flex gap-2">
                  {['common', 'rare', 'legendary'].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewItemRarity(r)}
                      className={`flex-1 py-2 text-xs font-pixel uppercase border-2 ${
                        newItemRarity === r 
                          ? 'bg-retro-pink text-black border-retro-pink' 
                          : 'border-gray-700 text-gray-500 hover:border-retro-pink/50'
                      }`}
                    >
                      {getRarityLabel(r)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setShowCraftModal(false)}
                  className="flex-1 py-3 border-2 border-gray-600 text-gray-400 font-pixel text-xs hover:bg-gray-800"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-retro-pink text-black font-pixel text-xs hover:bg-pink-400 border-2 border-retro-pink shadow-[0_0_15px_rgba(244,114,182,0.5)]"
                >
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer / Instructions */}
      <div className="mt-8 text-center text-xs opacity-50 font-terminal">
        PULSA [ALT + F4] PARA RAGE QUIT. INVENTARIO GUARDADO EN RAM LOCAL.
      </div>
    </div>
  );
};