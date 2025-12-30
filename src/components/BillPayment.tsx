import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Zap, Tv, Droplets, Wifi as WifiIcon } from 'lucide-react';
import { Screen } from '../App';
import { toast } from 'sonner@2.0.3';

interface BillPaymentProps {
  balance: number;
  onNavigate: (screen: Screen) => void;
  updateBalance: (amount: number) => void;
}

export function BillPayment({ balance, onNavigate, updateBalance }: BillPaymentProps) {
  const [activeTab, setActiveTab] = useState('electricity');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [provider, setProvider] = useState('');

  const electricityProviders = [
    { value: 'ekedc', label: 'EKEDC' },
    { value: 'ikedc', label: 'IKEDC' },
    { value: 'aedc', label: 'AEDC' },
    { value: 'phed', label: 'PHED' },
  ];

  const cableProviders = [
    { value: 'dstv', label: 'DSTV', color: 'bg-blue-600' },
    { value: 'gotv', label: 'GOtv', color: 'bg-red-600' },
    { value: 'startimes', label: 'Startimes', color: 'bg-orange-600' },
  ];

  const handlePayment = () => {
    if (!provider || !meterNumber || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    const amountNum = parseInt(amount);
    if (amountNum > balance) {
      toast.error('Insufficient balance');
      return;
    }

    updateBalance(-amountNum);
    toast.success('Bill payment successful!');
    
    // Reset form
    setProvider('');
    setMeterNumber('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Pay Bills</h2>
        </div>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-4 flex items-center justify-between">
            <span>Wallet Balance</span>
            <span>₦{balance.toLocaleString()}</span>
          </CardContent>
        </Card>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="electricity" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Electricity
            </TabsTrigger>
            <TabsTrigger value="cable" className="flex items-center gap-2">
              <Tv className="w-4 h-4" />
              Cable TV
            </TabsTrigger>
            <TabsTrigger value="internet" className="flex items-center gap-2">
              <WifiIcon className="w-4 h-4" />
              Internet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="electricity" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {electricityProviders.map((prov) => (
                    <Button
                      key={prov.value}
                      variant={provider === prov.value ? 'default' : 'outline'}
                      onClick={() => setProvider(prov.value)}
                      className="h-auto py-4"
                    >
                      {prov.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meter Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Meter Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter meter number"
                    value={meterNumber}
                    onChange={(e) => setMeterNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handlePayment}>
              Pay Bill
            </Button>
          </TabsContent>

          <TabsContent value="cable" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cableProviders.map((prov) => (
                    <button
                      key={prov.value}
                      onClick={() => setProvider(prov.value)}
                      className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                        provider === prov.value
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full ${prov.color} flex items-center justify-center`}>
                        <Tv className="w-5 h-5 text-white" />
                      </div>
                      <span>{prov.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Smart Card Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter smart card number"
                    value={meterNumber}
                    onChange={(e) => setMeterNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={handlePayment}>
              Pay Subscription
            </Button>
          </TabsContent>

          <TabsContent value="internet" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Internet Bill Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Account Number</Label>
                  <Input
                    type="text"
                    placeholder="Enter account number"
                    value={meterNumber}
                    onChange={(e) => setMeterNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handlePayment}>
                  Pay Bill
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
