import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, Wifi, CheckCircle2 } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface DataPurchaseProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

export function DataPurchase({ balance, onNavigate, updateBalance }: DataPurchaseProps) {
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const networks = [
    { value: 'mtn', label: 'MTN', color: 'bg-yellow-400' },
    { value: 'glo', label: 'Glo', color: 'bg-green-500' },
    { value: 'airtel', label: 'Airtel', color: 'bg-red-500' },
    { value: '9mobile', label: '9Mobile', color: 'bg-green-600' },
  ];

  const dataPlans = [
    { id: '1', size: '500MB', duration: '30 days', price: 500 },
    { id: '2', size: '1GB', duration: '30 days', price: 1000 },
    { id: '3', size: '2GB', duration: '30 days', price: 1800 },
    { id: '4', size: '5GB', duration: '30 days', price: 4000 },
    { id: '5', size: '10GB', duration: '30 days', price: 7500 },
    { id: '6', size: '20GB', duration: '30 days', price: 14000 },
  ];

  const handlePurchase = () => {
    if (!network || !phoneNumber || !selectedPlan) {
      toast.error('Please fill in all fields');
      return;
    }

    const plan = dataPlans.find(p => p.id === selectedPlan);
    if (!plan) return;

    if (plan.price > balance) {
      toast.error('Insufficient balance');
      return;
    }

    updateBalance(-plan.price);
    toast.success(`${plan.size} data bundle purchased successfully!`);
    
    // Reset form
    setNetwork('');
    setPhoneNumber('');
    setSelectedPlan('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Buy Data</h2>
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
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${net.color} flex items-center justify-center`}>
                    <Wifi className="w-4 h-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
            {network && (
              <p className="mt-3 text-center text-purple-600">
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
            <CardTitle>Select Data Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              <div className="space-y-3">
                {dataPlans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={plan.id} id={plan.id} />
                      <div>
                        <p>{plan.size}</p>
                        <p className="text-gray-500">{plan.duration}</p>
                      </div>
                    </div>
                    <p>₦{plan.price.toLocaleString()}</p>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Button
          className="w-full"
          size="lg"
          onClick={handlePurchase}
        >
          Purchase Data
        </Button>
      </div>
    </div>
  );
}
