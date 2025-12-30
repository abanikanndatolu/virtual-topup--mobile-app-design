import { useState } from 'react';
import { Button } from './ui/button';
import { Plus, X, Smartphone, Wifi, Wallet, Zap } from 'lucide-react';
import { Screen } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface QuickActionsProps {
  onNavigate: (screen: Screen) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Smartphone, label: 'Airtime', screen: 'airtime' as Screen, color: 'bg-blue-500' },
    { icon: Wifi, label: 'Data', screen: 'data' as Screen, color: 'bg-purple-500' },
    { icon: Wallet, label: 'Fund', screen: 'wallet' as Screen, color: 'bg-green-500' },
    { icon: Zap, label: 'Bills', screen: 'bills' as Screen, color: 'bg-orange-500' },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col gap-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.screen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onNavigate(action.screen);
                  setIsOpen(false);
                }}
                className={`${action.color} text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110`}
              >
                <action.icon className="w-6 h-6" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-8 h-8" />
        </motion.div>
      </Button>
    </div>
  );
}
