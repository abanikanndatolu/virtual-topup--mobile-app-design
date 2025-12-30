import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface AirtimePurchaseProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

export function AirtimePurchase({ balance, onNavigate, updateBalance }: AirtimePurchaseProps) {
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const networks = [
    { value: 'mtn', label: 'MTN', color: 'bg-yellow-400' },
    { value: 'glo', label: 'Glo', color: 'bg-green-500' },
    { value: 'airtel', label: 'Airtel', color: 'bg-red-500' },
    { value: '9mobile', label: '9Mobile', color: 'bg-green-600' },
  ];

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handlePurchase = () => {
    if (!network || !phoneNumber || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const amountNum = parseInt(amount);
    if (amountNum > balance) {
      toast.error('Insufficient balance');
      return;
    }

    updateBalance(-amountNum);
    toast.success(`Airtime purchase of ₦${amountNum} successful!`);
    
    // Reset form
    setNetwork('');
    setPhoneNumber('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Buy Airtime</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span>Wallet Balance</span>
            <span>₦{balance.toLocaleString()}</span>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {networks.map((net) => (
                <button
                  key={net.value}
                  onClick={() => setNetwork(net.value)}
                  className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                    network === net.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${net.color} flex items-center justify-center`}>
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
            {network && (
              <p className="mt-3 text-center text-blue-600">
                {networks.find(n => n.value === network)?.label} selected
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phone Number</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  onClick={() => setAmount(amt.toString())}
                >
                  ₦{amt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full"
          size="lg"
          onClick={handlePurchase}
        >
          Purchase Airtime
        </Button>
      </div>
    </div>
  );
}
